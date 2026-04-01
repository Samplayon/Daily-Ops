#!/usr/bin/env node

const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const { URL } = require("url");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 8000);
const ROOT = __dirname;
const PROTOTYPE_DIR = path.join(ROOT, "prototype");
const ARCHIVE_SNAPSHOT_DIR = path.join(ROOT, "archive_snapshots");
const ARCHIVE_SETTINGS_PATH = path.join(ROOT, "archive_settings.json");
const OPENAI_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5.2";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

const PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    scope: { type: "string" },
    assistantText: { type: "string" },
    details: { type: "array", items: { type: "string" } },
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          type: {
            type: "string",
            enum: ["mark_out_day", "set_assignment_block", "set_assignment_range"],
          },
          personId: { type: "string" },
          personName: { type: "string" },
          assignment: { type: ["string", "null"] },
          blockIndex: { type: ["integer", "null"] },
          blockIndexes: {
            type: ["array", "null"],
            items: { type: "integer" },
          },
        },
        required: [
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
  required: ["title", "summary", "scope", "assistantText", "details", "actions"],
};

async function ensureArchiveDirs() {
  await fsp.mkdir(ARCHIVE_SNAPSHOT_DIR, { recursive: true });
}

function buildSystemPrompt() {
  return (
    "You are a daily operations scheduling assistant. " +
    "Translate user requests into a safe plan of concrete scheduling actions. " +
    "Never apply changes directly. Only produce a proposal that the UI will review. " +
    "Respect the provided roster and time blocks exactly. " +
    "If a person is already out, do not schedule them. " +
    "When fairness is requested, spread work across people with lower existing load when possible. " +
    "When manager balance is requested, spread assignments across managers when possible. " +
    "If the request is ambiguous, make the narrowest reasonable plan. " +
    "Use only these action types: mark_out_day, set_assignment_block, set_assignment_range."
  );
}

function extractOutputText(responseJson) {
  if (typeof responseJson.output_text === "string" && responseJson.output_text.trim()) {
    return responseJson.output_text;
  }

  for (const item of responseJson.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string" && content.text.trim()) {
        return content.text;
      }
    }
  }

  throw new Error("OpenAI response did not include parsable text output.");
}

async function callOpenAIPlan(message, team, timeBlocks, history) {
  const apiKey = (process.env.OPENAI_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set.");
  }
  if (typeof fetch !== "function") {
    throw new Error("This Node version does not support fetch. Use Node 18+.");
  }

  const userPayload = {
    request: message,
    time_blocks: timeBlocks,
    team,
    recent_messages: (history || []).slice(-8),
  };

  const body = {
    model: DEFAULT_MODEL,
    input: [
      { role: "system", content: buildSystemPrompt() },
      {
        role: "user",
        content:
          "Create a JSON scheduling plan from this data. Return only actions that are grounded in the roster and time blocks.\n\n" +
          JSON.stringify(userPayload),
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "ops_plan",
        schema: PLAN_SCHEMA,
        strict: true,
      },
    },
  };

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message || "OpenAI API request failed.");
  }

  const plan = JSON.parse(extractOutputText(payload));
  if (!plan || !Array.isArray(plan.actions)) {
    throw new Error("OpenAI returned an invalid plan payload.");
  }
  return plan;
}

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const bucket = (process.env.SUPABASE_BUCKET || "daily-ops-archives").trim();
  if (!url || !serviceKey) {
    throw new Error("Supabase is not set up yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  return { url, serviceKey, bucket };
}

async function supabaseRequest(requestPath, { method = "GET", headers = {}, body, expectJson = true } = {}) {
  const config = getSupabaseConfig();
  if (typeof fetch !== "function") {
    throw new Error("This Node version does not support fetch. Use Node 18+.");
  }

  const response = await fetch(`${config.url}${requestPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${config.serviceKey}`,
      apikey: config.serviceKey,
      ...headers,
    },
    body,
  });

  const rawText = await response.text();
  if (!response.ok) {
    const error = new Error(rawText || `${response.status} ${response.statusText}`);
    error.status = response.status;
    error.details = rawText;
    throw error;
  }

  if (!expectJson) {
    return {
      body: Buffer.from(rawText),
      contentType: response.headers.get("content-type") || "application/octet-stream",
    };
  }

  if (!rawText) return {};
  return JSON.parse(rawText);
}

async function uploadFileToSupabase(filename, mimeType, contentBytes) {
  const config = getSupabaseConfig();
  const safeName = path.basename(filename);
  const bucketPath = encodeURIComponent(config.bucket);
  const filePath = encodeURIComponent(safeName);

  await supabaseRequest(`/storage/v1/object/${bucketPath}/${filePath}`, {
    method: "POST",
    headers: {
      "Content-Type": mimeType,
      "x-upsert": "true",
    },
    body: contentBytes,
    expectJson: false,
  });

  return {
    name: safeName,
    url: `/api/archives/open?name=${encodeURIComponent(safeName)}`,
  };
}

function formatArchiveTimestamp(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });
  } catch {
    return value;
  }
}

async function listSupabaseArchives() {
  const config = getSupabaseConfig();
  const bucketPath = encodeURIComponent(config.bucket);
  const payload = await supabaseRequest(`/storage/v1/object/list/${bucketPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prefix: "",
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "desc" },
    }),
  });

  const archives = (payload || [])
    .filter((item) => /\.(csv|html|pdf)$/i.test(item.name || ""))
    .map((item) => ({
      name: item.name,
      url: `/api/archives/open?name=${encodeURIComponent(item.name)}`,
      modifiedAt: formatArchiveTimestamp(item.updated_at || item.created_at || ""),
    }));

  return {
    folder: `Supabase bucket: ${config.bucket}`,
    bucket: config.bucket,
    archives,
  };
}

async function downloadSupabaseArchive(name) {
  const config = getSupabaseConfig();
  const safeName = path.basename(name);
  const bucketPath = encodeURIComponent(config.bucket);
  const filePath = encodeURIComponent(safeName);
  return supabaseRequest(`/storage/v1/object/${bucketPath}/${filePath}`, {
    method: "GET",
    expectJson: false,
  });
}

function defaultArchiveSettings() {
  return {
    enabled: false,
    time: "00:00",
    lastArchivedDate: "",
    lastArchivedAt: "",
  };
}

async function readArchiveSettings() {
  try {
    const raw = await fsp.readFile(ARCHIVE_SETTINGS_PATH, "utf8");
    return { ...defaultArchiveSettings(), ...JSON.parse(raw) };
  } catch {
    return defaultArchiveSettings();
  }
}

async function writeArchiveSettings(settings) {
  const merged = { ...defaultArchiveSettings(), ...(settings || {}) };
  await fsp.writeFile(ARCHIVE_SETTINGS_PATH, JSON.stringify(merged, null, 2));
  return merged;
}

function archiveFilenameForDate(dateKey) {
  return `${String(dateKey).trim()}.csv`;
}

function snapshotPathForDate(dateKey) {
  return path.join(ARCHIVE_SNAPSHOT_DIR, archiveFilenameForDate(dateKey));
}

async function saveArchiveSnapshot(dateKey, csv) {
  const snapshotPath = snapshotPathForDate(dateKey);
  await fsp.writeFile(snapshotPath, csv, "utf8");
  return snapshotPath;
}

function computeNextArchiveRun(now, settings) {
  const [hourText = "00", minuteText = "00"] = String(settings.time || "00:00").split(":");
  const candidate = new Date(now);
  candidate.setHours(Number(hourText), Number(minuteText), 0, 0);
  if (candidate <= now) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate;
}

function scheduledArchiveDueAt(dateKey, timeString) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  const [hourText = "00", minuteText = "00"] = String(timeString || "00:00").split(":");
  return new Date(year, month - 1, day + 1, Number(hourText), Number(minuteText), 0, 0);
}

async function archiveSnapshotForDate(dateKey, { force = false } = {}) {
  const settings = await readArchiveSettings();
  const snapshotPath = snapshotPathForDate(dateKey);

  await fsp.access(snapshotPath).catch(() => {
    throw new Error(`No saved schedule snapshot exists for ${dateKey}.`);
  });

  const filename = archiveFilenameForDate(dateKey);
  if (!force) {
    const existing = new Set((await listSupabaseArchives()).archives.map((archive) => archive.name));
    if (existing.has(filename)) {
      return { name: filename, url: `/api/archives/open?name=${encodeURIComponent(filename)}` };
    }
  }

  const csvBuffer = await fsp.readFile(snapshotPath);
  await uploadFileToSupabase(filename, "text/csv", csvBuffer);
  settings.lastArchivedDate = dateKey;
  settings.lastArchivedAt = new Date().toISOString();
  await writeArchiveSettings(settings);

  return { name: filename, url: `/api/archives/open?name=${encodeURIComponent(filename)}` };
}

async function processArchiveBacklog(now = new Date()) {
  const settings = await readArchiveSettings();
  if (!settings.enabled) return [];

  const files = await fsp.readdir(ARCHIVE_SNAPSHOT_DIR).catch(() => []);
  const archived = [];
  for (const file of files.filter((entry) => entry.endsWith(".csv")).sort()) {
    const dateKey = path.basename(file, ".csv");
    const dueAt = scheduledArchiveDueAt(dateKey, settings.time);
    if (now < dueAt) continue;
    try {
      archived.push(await archiveSnapshotForDate(dateKey));
    } catch {
      // Keep backlog processing resilient.
    }
  }
  return archived;
}

async function getArchiveStatus() {
  const settings = await readArchiveSettings();
  const archivesPayload = await listSupabaseArchives();
  const nextRun = computeNextArchiveRun(new Date(), settings);
  return {
    folder: archivesPayload.folder,
    archives: archivesPayload.archives,
    bucket: archivesPayload.bucket,
    settings: {
      enabled: Boolean(settings.enabled),
      time: settings.time || "00:00",
      lastArchivedDate: settings.lastArchivedDate || "",
      lastArchivedAt: settings.lastArchivedAt || "",
      nextRun: nextRun.toISOString(),
    },
  };
}

function sendJson(res, payload, status = 200) {
  const body = Buffer.from(JSON.stringify(payload));
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": String(body.length),
  });
  res.end(body);
}

function sendText(res, text, status = 200, contentType = "text/plain; charset=utf-8") {
  const body = Buffer.from(text);
  res.writeHead(status, {
    "Content-Type": contentType,
    "Content-Length": String(body.length),
  });
  res.end(body);
}

async function parseRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function serveStatic(req, res, pathname) {
  let filePath = pathname === "/" ? path.join(PROTOTYPE_DIR, "index.html") : path.join(PROTOTYPE_DIR, pathname);
  filePath = path.normalize(filePath);

  if (!filePath.startsWith(PROTOTYPE_DIR)) {
    sendText(res, "Not found.", 404);
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    const content = await fsp.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    sendText(res, content, 200, MIME_TYPES[ext] || "application/octet-stream");
  } catch {
    sendText(res, "Not found.", 404);
  }
}

async function handleGet(req, res, url) {
  if (url.pathname === "/api/archives/open") {
    const archiveName = path.basename(url.searchParams.get("name") || "");
    if (!archiveName) {
      sendText(res, "Archive not found.", 404);
      return;
    }

    const { body, contentType } = await downloadSupabaseArchive(archiveName);
    res.writeHead(200, {
      "Content-Type": contentType || "text/csv; charset=utf-8",
      "Content-Length": String(body.length),
    });
    res.end(body);
    return;
  }

  if (url.pathname === "/api/archives/status") {
    try {
      sendJson(res, await getArchiveStatus());
    } catch (error) {
      sendJson(
        res,
        {
          folder: "Supabase bucket: daily-ops-archives",
          archives: [],
          settings: defaultArchiveSettings(),
          error: error.message,
        },
        400
      );
    }
    return;
  }

  await serveStatic(req, res, url.pathname);
}

async function handlePost(req, res, url) {
  const data = await parseRequestBody(req);

  if (url.pathname === "/api/plan") {
    const plan = await callOpenAIPlan(data.message || "", data.team || [], data.timeBlocks || [], data.history || []);
    sendJson(res, { plan, powered_by: "openai" });
    return;
  }

  if (url.pathname === "/api/archives/config") {
    const settings = await readArchiveSettings();
    settings.enabled = Boolean(data.enabled);
    settings.time = data.time || settings.time || "00:00";
    sendJson(res, { ok: true, settings: await writeArchiveSettings(settings) });
    return;
  }

  if (url.pathname === "/api/archives/snapshot") {
    const dateKey = data.date || new Date().toISOString().slice(0, 10);
    const csv = data.html || "";
    await saveArchiveSnapshot(dateKey, csv);
    const archived = await processArchiveBacklog();
    sendJson(res, { ok: true, archived: archived.map((entry) => entry.name) });
    return;
  }

  if (url.pathname === "/api/archives/run-test") {
    const dateKey = data.date || new Date().toISOString().slice(0, 10);
    const csv = data.html || "";
    await saveArchiveSnapshot(dateKey, csv);
    const saved = await archiveSnapshotForDate(dateKey, { force: true });
    sendJson(res, {
      ok: true,
      message: `Saved archive to Supabase as ${saved.name}`,
      archive: saved,
    });
    return;
  }

  sendJson(res, { error: "Not found." }, 404);
}

function sendRouteError(res, url, error) {
  const details = error.details || error.message || String(error);

  if (url.pathname.startsWith("/api/archives/")) {
    sendJson(
      res,
      {
        error: "Supabase archive request failed.",
        details,
      },
      error.status || 502
    );
    return;
  }

  if (url.pathname === "/api/plan") {
    sendJson(
      res,
      {
        error: "OpenAI API request failed.",
        details,
      },
      error.status || 502
    );
    return;
  }

  sendJson(res, { error: details }, error.status || 500);
}

async function main() {
  await ensureArchiveDirs();

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${HOST}:${PORT}`);
      if (req.method === "GET") {
        await handleGet(req, res, url);
        return;
      }
      if (req.method === "POST") {
        await handlePost(req, res, url);
        return;
      }
      sendText(res, "Method not allowed.", 405);
    } catch (error) {
      try {
        const url = new URL(req.url, `http://${HOST}:${PORT}`);
        sendRouteError(res, url, error);
      } catch {
        sendJson(res, { error: error.message || "Server error." }, 500);
      }
    }
  });

  setInterval(() => {
    processArchiveBacklog().catch(() => {
      // Keep the local scheduler quiet and resilient.
    });
  }, 60_000);

  server.listen(PORT, HOST, () => {
    console.log(`Serving Daily Ops prototype at http://${HOST}:${PORT}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
