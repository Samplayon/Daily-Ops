#!/usr/bin/env python3
import json
import os
import smtplib
import threading
import time
import secrets
from datetime import datetime, date, timedelta
from email.message import EmailMessage
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlencode, urlparse, unquote, quote
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo


HOST = "127.0.0.1"
PORT = 8000
ROOT = Path(__file__).resolve().parent
PROTOTYPE_DIR = ROOT / "prototype"
ARCHIVE_SNAPSHOT_DIR = ROOT / "archive_snapshots"
ARCHIVE_SETTINGS_PATH = ROOT / "archive_settings.json"
OPENAI_URL = "https://api.openai.com/v1/responses"
DEFAULT_MODEL = os.environ.get("OPENAI_MODEL", "gpt-5.2")
TIMEZONE = ZoneInfo("America/New_York")
MICROSOFT_AUTH_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
MICROSOFT_TOKEN_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/token"
MICROSOFT_GRAPH_BASE = "https://graph.microsoft.com/v1.0"
MICROSOFT_SCOPES = [
    "offline_access",
    "openid",
    "User.Read",
    "Files.ReadWrite.AppFolder",
]
ONEDRIVE_STATE = {
    "oauth_state": None,
}
ONEDRIVE_TOKEN_PATH = ROOT / "onedrive_token.json"

ALERT_STATE = {
    "schedule": {"groups": [], "people": []},
    "registrations": {},
    "sent": set(),
}
ALERT_LOCK = threading.Lock()
ARCHIVE_LOCK = threading.Lock()
ARCHIVE_SNAPSHOT_DIR.mkdir(exist_ok=True)
PLAN_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "title": {"type": "string"},
        "summary": {"type": "string"},
        "scope": {"type": "string"},
        "assistantText": {"type": "string"},
        "details": {
            "type": "array",
            "items": {"type": "string"},
        },
        "actions": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "mark_out_day",
                            "set_assignment_block",
                            "set_assignment_range",
                        ],
                    },
                    "personId": {"type": "string"},
                    "personName": {"type": "string"},
                    "assignment": {"type": ["string", "null"]},
                    "blockIndex": {"type": ["integer", "null"]},
                    "blockIndexes": {
                        "type": ["array", "null"],
                        "items": {"type": "integer"},
                    },
                },
                "required": [
                    "type",
                    "personId",
                    "personName",
                    "assignment",
                    "blockIndex",
                    "blockIndexes",
                ],
            },
        },
    },
    "required": ["title", "summary", "scope", "assistantText", "details", "actions"],
}


def build_system_prompt():
    return (
        "You are a daily operations scheduling assistant. "
        "Translate user requests into a safe plan of concrete scheduling actions. "
        "Never apply changes directly. Only produce a proposal that the UI will review. "
        "Respect the provided roster and time blocks exactly. "
        "If a person is already out, do not schedule them. "
        "When fairness is requested, spread work across people with lower existing load when possible. "
        "When manager balance is requested, spread assignments across managers when possible. "
        "If the request is ambiguous, make the narrowest reasonable plan. "
        "Use only these action types: mark_out_day, set_assignment_block, set_assignment_range."
    )


def extract_output_text(response_json):
    if isinstance(response_json.get("output_text"), str) and response_json["output_text"].strip():
        return response_json["output_text"]

    for item in response_json.get("output", []):
        for content in item.get("content", []):
            text = content.get("text")
            if isinstance(text, str) and text.strip():
                return text

    raise ValueError("OpenAI response did not include parsable text output.")


def call_openai_plan(message, team, time_blocks, history):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set.")

    user_payload = {
        "request": message,
        "time_blocks": time_blocks,
        "team": team,
        "recent_messages": history[-8:],
    }

    body = {
        "model": DEFAULT_MODEL,
        "input": [
            {"role": "system", "content": build_system_prompt()},
            {
                "role": "user",
                "content": (
                    "Create a JSON scheduling plan from this data. "
                    "Return only actions that are grounded in the roster and time blocks.\n\n"
                    + json.dumps(user_payload)
                ),
            },
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "ops_plan",
                "schema": PLAN_SCHEMA,
                "strict": True,
            }
        },
    }

    request = Request(
        OPENAI_URL,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    with urlopen(request, timeout=90) as response:
        payload = json.loads(response.read().decode("utf-8"))

    plan = json.loads(extract_output_text(payload))

    if not isinstance(plan, dict) or "actions" not in plan:
        raise ValueError("OpenAI returned an invalid plan payload.")

    return plan


def send_email(to_address, subject, body):
    host = os.environ.get("SMTP_HOST", "").strip()
    port = int(os.environ.get("SMTP_PORT", "587"))
    username = os.environ.get("SMTP_USERNAME", "").strip()
    password = os.environ.get("SMTP_PASSWORD", "").strip()
    from_address = os.environ.get("SMTP_FROM", username).strip()

    if not host or not username or not password or not from_address:
        raise RuntimeError("Email settings are not set. Add SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, and SMTP_FROM.")

    message = EmailMessage()
    message["From"] = from_address
    message["To"] = to_address
    message["Subject"] = subject
    message.set_content(body)

    with smtplib.SMTP(host, port, timeout=45) as server:
        server.starttls()
        server.login(username, password)
        server.send_message(message)


def get_onedrive_redirect_uri():
    return os.environ.get("MICROSOFT_REDIRECT_URI", f"http://{HOST}:{PORT}/auth/onedrive/callback").strip()


def get_onedrive_oauth_config():
    client_id = os.environ.get("MICROSOFT_CLIENT_ID", "").strip()
    client_secret = os.environ.get("MICROSOFT_CLIENT_SECRET", "").strip()
    redirect_uri = get_onedrive_redirect_uri()
    if not client_id or not client_secret:
        raise RuntimeError("OneDrive is not set up yet. Add MICROSOFT_CLIENT_ID and MICROSOFT_CLIENT_SECRET.")
    return {
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
    }


def read_onedrive_token():
    if not ONEDRIVE_TOKEN_PATH.exists():
        return None
    try:
        return json.loads(ONEDRIVE_TOKEN_PATH.read_text())
    except Exception:
        return None


def write_onedrive_token(token_payload):
    ONEDRIVE_TOKEN_PATH.write_text(json.dumps(token_payload, indent=2))


def onedrive_token_request(data):
    body = urlencode(data).encode("utf-8")
    request = Request(
        MICROSOFT_TOKEN_URL,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    with urlopen(request, timeout=45) as response:
        return json.loads(response.read().decode("utf-8"))


def refresh_onedrive_token_if_needed():
    token = read_onedrive_token()
    if not token:
        raise RuntimeError("OneDrive is not connected yet.")

    expires_at = token.get("expires_at", 0)
    if token.get("access_token") and time.time() < float(expires_at) - 60:
        return token

    refresh_token = token.get("refresh_token")
    if not refresh_token:
        raise RuntimeError("OneDrive needs to be reconnected.")

    config = get_onedrive_oauth_config()
    refreshed = onedrive_token_request(
        {
            "client_id": config["client_id"],
            "client_secret": config["client_secret"],
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
            "redirect_uri": config["redirect_uri"],
            "scope": " ".join(MICROSOFT_SCOPES),
        }
    )

    token["access_token"] = refreshed["access_token"]
    token["expires_at"] = time.time() + int(refreshed.get("expires_in", 3600))
    if refreshed.get("refresh_token"):
        token["refresh_token"] = refreshed["refresh_token"]
    write_onedrive_token(token)
    return token


def onedrive_api_request(url, method="GET", headers=None, data=None):
    token = refresh_onedrive_token_if_needed()
    request_headers = {
        "Authorization": f"Bearer {token['access_token']}",
    }
    if headers:
        request_headers.update(headers)

    request = Request(url, data=data, headers=request_headers, method=method)
    with urlopen(request, timeout=60) as response:
        raw = response.read()
        if not raw:
            return {}
        return json.loads(raw.decode("utf-8"))


def get_onedrive_status():
    token = read_onedrive_token()
    if not token:
        return {"connected": False}

    try:
        userinfo = onedrive_api_request(f"{MICROSOFT_GRAPH_BASE}/me")
        return {
            "connected": True,
            "email": (userinfo.get("mail") or userinfo.get("userPrincipalName") or ""),
        }
    except Exception:
        return {"connected": False}


def get_onedrive_app_folder():
    folder = onedrive_api_request(f"{MICROSOFT_GRAPH_BASE}/me/drive/special/approot")
    return {
        "id": folder.get("id", ""),
        "name": folder.get("name", "Apps"),
        "webUrl": folder.get("webUrl", ""),
    }


def upload_file_to_onedrive(filename, mime_type, content_bytes):
    safe_name = Path(filename).name
    request_url = f"{MICROSOFT_GRAPH_BASE}/me/drive/special/approot:/{safe_name}:/content"
    response = onedrive_api_request(
        request_url,
        method="PUT",
        headers={
            "Content-Type": mime_type,
        },
        data=content_bytes,
    )
    return response


def list_onedrive_archives():
    folder = get_onedrive_app_folder()
    payload = onedrive_api_request(f"{MICROSOFT_GRAPH_BASE}/me/drive/special/approot/children")
    items = payload.get("value", [])
    archives = []
    for item in sorted(items, key=lambda row: row.get("lastModifiedDateTime", ""), reverse=True):
        name = item.get("name", "")
        if not name.endswith((".csv", ".html", ".pdf")):
            continue
        modified_at = item.get("lastModifiedDateTime", "")
        formatted = modified_at
        try:
            formatted = (
                datetime.fromisoformat(modified_at.replace("Z", "+00:00"))
                .astimezone(TIMEZONE)
                .strftime("%b %d, %Y %I:%M %p")
            )
        except Exception:
            pass
        archives.append(
            {
                "name": name,
                "url": item.get("webUrl", ""),
                "modifiedAt": formatted,
            }
        )
    return {
        "folder": folder.get("webUrl", ""),
        "archives": archives,
    }


def get_supabase_config():
    url = os.environ.get("SUPABASE_URL", "").strip().rstrip("/")
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    bucket = os.environ.get("SUPABASE_BUCKET", "daily-ops-archives").strip()
    if not url or not service_key:
        raise RuntimeError("Supabase is not set up yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
    return {
        "url": url,
        "service_key": service_key,
        "bucket": bucket or "daily-ops-archives",
    }


def supabase_request(path, method="GET", headers=None, data=None, expect_json=True):
    config = get_supabase_config()
    request_headers = {
        "Authorization": f"Bearer {config['service_key']}",
        "apikey": config["service_key"],
    }
    if headers:
        request_headers.update(headers)
    request = Request(f"{config['url']}{path}", data=data, headers=request_headers, method=method)
    with urlopen(request, timeout=60) as response:
        raw = response.read()
        if not expect_json:
            return raw, response.headers.get("Content-Type", "application/octet-stream")
        if not raw:
            return {}
        return json.loads(raw.decode("utf-8"))


def upload_file_to_supabase(filename, mime_type, content_bytes):
    config = get_supabase_config()
    safe_name = Path(filename).name
    bucket_path = quote(config["bucket"], safe="")
    file_path = quote(safe_name, safe="")
    path = f"/storage/v1/object/{bucket_path}/{file_path}"
    supabase_request(
        path,
        method="POST",
        headers={
            "Content-Type": mime_type,
            "x-upsert": "true",
        },
        data=content_bytes,
        expect_json=False,
    )
    return {
        "name": safe_name,
        "url": f"/api/archives/open?name={safe_name}",
    }


def list_supabase_archives():
    config = get_supabase_config()
    bucket_path = quote(config["bucket"], safe="")
    payload = supabase_request(
        f"/storage/v1/object/list/{bucket_path}",
        method="POST",
        headers={"Content-Type": "application/json"},
        data=json.dumps(
            {
                "prefix": "",
                "limit": 100,
                "offset": 0,
                "sortBy": {"column": "name", "order": "desc"},
            }
        ).encode("utf-8"),
    )
    archives = []
    for item in payload:
        name = item.get("name", "")
        if not name.endswith((".csv", ".html", ".pdf")):
            continue
        modified_at = item.get("updated_at") or item.get("created_at") or ""
        formatted = modified_at
        try:
            formatted = (
                datetime.fromisoformat(modified_at.replace("Z", "+00:00"))
                .astimezone(TIMEZONE)
                .strftime("%b %d, %Y %I:%M %p")
            )
        except Exception:
            pass
        archives.append(
            {
                "name": name,
                "url": f"/api/archives/open?name={urlencode({'n': name}).split('=', 1)[1]}",
                "modifiedAt": formatted,
            }
        )
    return {
        "folder": f"Supabase bucket: {config['bucket']}",
        "archives": archives,
        "bucket": config["bucket"],
    }


def download_supabase_archive(name):
    config = get_supabase_config()
    safe_name = Path(name).name
    bucket_path = quote(config["bucket"], safe="")
    file_path = quote(safe_name, safe="")
    raw, content_type = supabase_request(
        f"/storage/v1/object/{bucket_path}/{file_path}",
        method="GET",
        expect_json=False,
    )
    return raw, content_type


def default_archive_settings():
    return {
        "enabled": False,
        "time": "00:00",
        "lastArchivedDate": "",
        "lastArchivedAt": "",
    }


def read_archive_settings():
    settings = default_archive_settings()
    if not ARCHIVE_SETTINGS_PATH.exists():
        return settings
    try:
        saved = json.loads(ARCHIVE_SETTINGS_PATH.read_text())
        settings.update({key: value for key, value in saved.items() if key in settings})
    except Exception:
        return settings
    return settings


def write_archive_settings(settings):
    merged = default_archive_settings()
    merged.update(settings or {})
    ARCHIVE_SETTINGS_PATH.write_text(json.dumps(merged, indent=2))
    return merged


def archive_filename_for_date(date_key):
    return f"{date_key}.csv"


def snapshot_path_for_date(date_key):
    safe_date = date_key.strip()
    return ARCHIVE_SNAPSHOT_DIR / archive_filename_for_date(safe_date)


def save_archive_snapshot(date_key, html):
    snapshot_path = snapshot_path_for_date(date_key)
    snapshot_path.write_text(html, encoding="utf-8")
    return snapshot_path


def scheduled_archive_due_at(date_key, time_string):
    archive_date = date.fromisoformat(date_key)
    hour_text, minute_text = (time_string or "00:00").split(":")
    due_hour = int(hour_text)
    due_minute = int(minute_text)
    due_date = archive_date + timedelta(days=1)
    return datetime(due_date.year, due_date.month, due_date.day, due_hour, due_minute, tzinfo=TIMEZONE)


def archive_snapshot_for_date(date_key, force=False):
    settings = read_archive_settings()
    snapshot_path = snapshot_path_for_date(date_key)
    if not snapshot_path.exists():
        raise RuntimeError(f"No saved schedule snapshot exists for {date_key}.")

    filename = archive_filename_for_date(date_key)
    if not force:
        existing = {archive["name"] for archive in list_supabase_archives().get("archives", [])}
        if filename in existing:
            return {"name": filename, "url": f"/api/archives/open?name={filename}"}

    upload_file_to_supabase(
        filename=filename,
        mime_type="text/csv",
        content_bytes=snapshot_path.read_bytes(),
    )
    settings["lastArchivedDate"] = date_key
    settings["lastArchivedAt"] = datetime.now(TIMEZONE).isoformat()
    write_archive_settings(settings)
    return {
        "name": filename,
        "url": f"/api/archives/open?name={filename}",
    }


def compute_next_archive_run(now, settings):
    run_hour, run_minute = (settings.get("time") or "00:00").split(":")
    candidate = datetime(now.year, now.month, now.day, int(run_hour), int(run_minute), tzinfo=TIMEZONE)
    if candidate <= now:
        candidate += timedelta(days=1)
    return candidate


def get_archive_status():
    settings = read_archive_settings()
    archives_payload = list_supabase_archives()
    now = datetime.now(TIMEZONE)
    next_run = compute_next_archive_run(now, settings)
    return {
        "folder": archives_payload.get("folder", ""),
        "archives": archives_payload["archives"],
        "bucket": archives_payload.get("bucket", ""),
        "settings": {
            "enabled": bool(settings.get("enabled")),
            "time": settings.get("time", "00:00"),
            "lastArchivedDate": settings.get("lastArchivedDate", ""),
            "lastArchivedAt": settings.get("lastArchivedAt", ""),
            "nextRun": next_run.isoformat(),
        },
    }


def process_archive_backlog(now=None):
    now = now or datetime.now(TIMEZONE)
    settings = read_archive_settings()
    if not settings.get("enabled"):
        return []

    archived = []
    with ARCHIVE_LOCK:
        for snapshot_path in sorted(ARCHIVE_SNAPSHOT_DIR.glob("*.csv")):
            date_key = snapshot_path.stem
            try:
                due_at = scheduled_archive_due_at(date_key, settings.get("time", "00:00"))
            except Exception:
                continue
            if now < due_at:
                continue
            try:
                saved = archive_snapshot_for_date(date_key, force=False)
                archived.append(saved)
            except RuntimeError:
                continue
    return archived


def alert_scope_matches(scope, assignment):
    if scope == "all":
        return True
    if scope == "phones":
        return assignment == "Tier 2 Phones"
    if scope == "disputes":
        return assignment == "Disputes"
    if scope == "training":
        return assignment == "Training"
    return True


def build_shift_alert_message(agent_name, block, assignment):
    return f"You are on {assignment} from {block['label']}."


def sync_alert_state(schedule, registration):
    with ALERT_LOCK:
        if schedule:
            ALERT_STATE["schedule"] = schedule
        if registration and registration.get("agentId"):
            ALERT_STATE["registrations"][registration["agentId"]] = registration


def send_test_alert(schedule, registration):
    if not registration:
        raise RuntimeError("Missing alert registration.")
    if not registration.get("emailAddress"):
        raise RuntimeError("Email address is missing.")

    people = {
        person["id"]: person
        for person in (schedule or {}).get("people", [])
    }
    person = people.get(registration["agentId"])
    if not person:
        raise RuntimeError("Could not find that agent in the current schedule.")

    matching_assignment = None
    matching_label = None
    for assignment_entry in person.get("assignments", []):
        assignment = assignment_entry.get("primaryAssignment", "Open")
        if alert_scope_matches(registration.get("alertScope", "all"), assignment):
            matching_assignment = assignment
            matching_label = assignment_entry.get("label", "today")
            break

    if not matching_assignment:
        raise RuntimeError("I could not find a matching shift for this alert setting.")

    subject = "Daily Ops test alert"
    message = f"Test alert: {person['name']}, you are on {matching_assignment} during {matching_label}."
    send_email(registration.get("emailAddress", ""), subject, message)
    return message


def alert_worker():
    while True:
        try:
            now = datetime.now(TIMEZONE)
            with ALERT_LOCK:
                schedule = ALERT_STATE["schedule"]
                registrations = list(ALERT_STATE["registrations"].values())
                sent_keys = ALERT_STATE["sent"]

            groups = schedule.get("groups", [])
            people_map = {person["id"]: person for person in schedule.get("people", [])}

            for registration in registrations:
                if not registration.get("enabled") or not registration.get("emailAddress"):
                    continue

                person = people_map.get(registration.get("agentId"))
                if not person:
                    continue

                for index, block in enumerate(groups):
                    assignment_entry = (person.get("assignments") or [])[index] if index < len(person.get("assignments") or []) else None
                    if not assignment_entry:
                        continue

                    assignment = assignment_entry.get("primaryAssignment", "Open")
                    if assignment in ("Open", "OOO/Sick/PTO"):
                        continue
                    if not alert_scope_matches(registration.get("alertScope", "all"), assignment):
                        continue

                    send_hour = block.get("startHour", 0)
                    send_minute = 0
                    timing = registration.get("alertTiming", "start")
                    if timing in ("15", "30"):
                        minutes_before = int(timing)
                        send_minute = 60 - minutes_before
                        send_hour = max(0, send_hour - 1)

                    alert_key = f"{now.date()}:{registration['agentId']}:{block.get('label')}:{timing}"
                    if alert_key in sent_keys:
                        continue

                    if now.hour == send_hour and now.minute == send_minute:
                        subject = f"Shift alert: {assignment}"
                        message = build_shift_alert_message(person["name"], block, assignment)
                        send_email(registration.get("emailAddress", ""), subject, message)
                        with ALERT_LOCK:
                            ALERT_STATE["sent"].add(alert_key)
        except Exception:
            pass

        time.sleep(30)


def archive_worker():
    while True:
        try:
            process_archive_backlog()
        except Exception:
            pass
        time.sleep(60)


class OpsHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROTOTYPE_DIR), **kwargs)

    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/api/archives/open":
            query = parse_qs(parsed.query)
            archive_name = Path(query.get("name", [""])[0]).name
            if not archive_name:
                self.send_error(404, "Archive not found.")
                return
            body, content_type = download_supabase_archive(archive_name)
            self.send_response(200)
            self.send_header("Content-Type", content_type or "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if parsed.path == "/api/archives/status":
            try:
                self._send_json(get_archive_status())
            except RuntimeError as exc:
                self._send_json(
                    {
                        "folder": "Supabase bucket: daily-ops-archives",
                        "archives": [],
                        "settings": default_archive_settings(),
                        "error": str(exc),
                    },
                    status=400,
                )
            return

        if parsed.path == "/api/onedrive/status":
            try:
                status = get_onedrive_status()
                if status.get("connected"):
                    status["folder"] = get_onedrive_app_folder()
                self._send_json(status)
            except RuntimeError as exc:
                self._send_json({"connected": False, "error": str(exc)}, status=400)
            return

        if parsed.path == "/api/onedrive/archives":
            try:
                self._send_json(list_onedrive_archives())
            except RuntimeError as exc:
                self._send_json({"folder": "", "archives": [], "error": str(exc)}, status=400)
            return

        if parsed.path == "/auth/onedrive/start":
            try:
                config = get_onedrive_oauth_config()
                oauth_state = secrets.token_urlsafe(24)
                ONEDRIVE_STATE["oauth_state"] = oauth_state
                params = {
                    "client_id": config["client_id"],
                    "redirect_uri": config["redirect_uri"],
                    "response_type": "code",
                    "response_mode": "query",
                    "prompt": "select_account",
                    "scope": " ".join(MICROSOFT_SCOPES),
                    "state": oauth_state,
                }
                self.send_response(302)
                self.send_header("Location", f"{MICROSOFT_AUTH_URL}?{urlencode(params)}")
                self.end_headers()
            except RuntimeError as exc:
                self.send_error(400, str(exc))
            return

        if parsed.path == "/auth/onedrive/callback":
            query = parse_qs(parsed.query)
            if query.get("state", [""])[0] != ONEDRIVE_STATE.get("oauth_state"):
                self.send_error(400, "OneDrive state did not match.")
                return

            code = query.get("code", [""])[0]
            if not code:
                self.send_error(400, "OneDrive did not return a code.")
                return

            try:
                config = get_onedrive_oauth_config()
                token_payload = onedrive_token_request(
                    {
                        "code": code,
                        "client_id": config["client_id"],
                        "client_secret": config["client_secret"],
                        "redirect_uri": config["redirect_uri"],
                        "grant_type": "authorization_code",
                        "scope": " ".join(MICROSOFT_SCOPES),
                    }
                )
                token_payload["expires_at"] = time.time() + int(token_payload.get("expires_in", 3600))
                write_onedrive_token(token_payload)
                body = (
                    "<html><body style='font-family:Arial,sans-serif;padding:32px;'>"
                    "<h2>OneDrive connected</h2>"
                    "<p>You can close this tab and go back to Daily Ops.</p>"
                    "</body></html>"
                ).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
            except RuntimeError as exc:
                self.send_error(400, str(exc))
            return

        return super().do_GET()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(length)

        try:
            data = json.loads(raw_body.decode("utf-8"))
            if self.path == "/api/plan":
                plan = call_openai_plan(
                    message=data.get("message", ""),
                    team=data.get("team", []),
                    time_blocks=data.get("timeBlocks", []),
                    history=data.get("history", []),
                )
                self._send_json({"plan": plan, "powered_by": "openai"})
                return

            if self.path == "/api/alerts/sync":
                sync_alert_state(
                    schedule=data.get("schedule", {}),
                    registration=data.get("registration"),
                )
                self._send_json({"ok": True})
                return

            if self.path == "/api/alerts/test":
                message = send_test_alert(
                    schedule=data.get("schedule", {}),
                    registration=data.get("registration"),
                )
                self._send_json({"ok": True, "message": message})
                return

            if self.path == "/api/archives/config":
                settings = read_archive_settings()
                settings["enabled"] = bool(data.get("enabled"))
                settings["time"] = data.get("time") or settings.get("time", "00:00")
                saved_settings = write_archive_settings(settings)
                self._send_json({"ok": True, "settings": saved_settings})
                return

            if self.path == "/api/archives/snapshot":
                date_key = data.get("date") or datetime.now(TIMEZONE).strftime("%Y-%m-%d")
                html = data.get("html", "")
                save_archive_snapshot(date_key, html)
                archived = process_archive_backlog()
                self._send_json({"ok": True, "archived": [path.name for path in archived]})
                return

            if self.path == "/api/archives/run-test":
                date_key = data.get("date") or datetime.now(TIMEZONE).strftime("%Y-%m-%d")
                html = data.get("html", "")
                save_archive_snapshot(date_key, html)
                saved = archive_snapshot_for_date(date_key, force=True)
                self._send_json(
                    {
                        "ok": True,
                        "message": f"Saved archive to Supabase as {saved['name']}",
                        "archive": {
                            "name": saved["name"],
                            "url": saved["url"],
                        },
                    }
                )
                return

            if self.path == "/api/onedrive/test-upload":
                html = data.get("html", "")
                filename = data.get("filename", "daily-ops-test.html")
                uploaded = upload_file_to_onedrive(
                    filename=filename,
                    mime_type="text/html",
                    content_bytes=html.encode("utf-8"),
                )
                self._send_json(
                    {
                        "ok": True,
                        "message": f"Uploaded {uploaded.get('name', filename)} to OneDrive.",
                    }
                )
                return

            self._send_json({"error": "Not found."}, status=404)
        except RuntimeError as exc:
            self._send_json({"error": str(exc)}, status=400)
        except HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="ignore")
            if self.path.startswith("/api/archives/"):
                self._send_json(
                    {
                        "error": "Supabase archive request failed.",
                        "details": detail or str(exc),
                    },
                    status=502,
                )
                return
            if self.path.startswith("/api/onedrive/"):
                self._send_json(
                    {
                        "error": "OneDrive request failed.",
                        "details": detail or str(exc),
                    },
                    status=502,
                )
                return
            self._send_json(
                {"error": "OpenAI API request failed.", "details": detail or str(exc)},
                status=502,
            )
        except URLError as exc:
            if self.path.startswith("/api/archives/"):
                self._send_json(
                    {
                        "error": "Could not reach Supabase.",
                        "details": str(exc),
                    },
                    status=502,
                )
                return
            if self.path.startswith("/api/onedrive/"):
                self._send_json(
                    {
                        "error": "Could not reach OneDrive.",
                        "details": str(exc),
                    },
                    status=502,
                )
                return
            self._send_json(
                {"error": "Could not reach the OpenAI API.", "details": str(exc)},
                status=502,
            )
        except Exception as exc:
            self._send_json({"error": "Planning request failed.", "details": str(exc)}, status=500)


def main():
    worker = threading.Thread(target=alert_worker, daemon=True)
    worker.start()
    archive_thread = threading.Thread(target=archive_worker, daemon=True)
    archive_thread.start()
    process_archive_backlog()
    server = ThreadingHTTPServer((HOST, PORT), OpsHandler)
    print(f"Serving Daily Ops prototype at http://{HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    main()
