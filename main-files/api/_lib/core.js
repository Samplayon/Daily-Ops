const OPENAI_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5.2";
const ARCHIVE_SETTINGS_OBJECT = "__config__-archive-settings.json";
const SNAPSHOT_PREFIX = "__snapshot__-";

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

function encodeStoragePath(value) {
  return String(value)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
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

function defaultArchiveSettings() {
  return {
    enabled: false,
    time: "00:00",
    lastArchivedDate: "",
    lastArchivedAt: "",
  };
}

function archiveFilenameForDate(dateKey) {
  return `${String(dateKey).trim()}.csv`;
}

function snapshotObjectForDate(dateKey) {
  return `${SNAPSHOT_PREFIX}${archiveFilenameForDate(dateKey)}`;
}

function computeNextArchiveRun(now, settings) {
  const [hourText = "00", minuteText = "00"] = String(settings.time || "00:00").split(":");
  const candidate = new Date(now);
  candidate.setHours(Number(hourText), Number(minuteText), 0, 0);
  if (candidate <= now) candidate.setDate(candidate.getDate() + 1);
  return candidate;
}

function scheduledArchiveDueAt(dateKey, timeString) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  const [hourText = "00", minuteText = "00"] = String(timeString || "00:00").split(":");
  return new Date(year, month - 1, day + 1, Number(hourText), Number(minuteText), 0, 0);
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

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const bucket = (process.env.SUPABASE_BUCKET || "Daily Ops Archives").trim();
  if (!url || !serviceKey) {
    throw new Error("Supabase is not set up yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  return { url, serviceKey, bucket };
}

async function supabaseRequest(requestPath, { method = "GET", headers = {}, body, expectJson = true } = {}) {
  const config = getSupabaseConfig();
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

  return rawText ? JSON.parse(rawText) : {};
}

async function uploadObject(objectName, mimeType, contentBytes) {
  const config = getSupabaseConfig();
  const bucketPath = encodeURIComponent(config.bucket);
  const filePath = encodeStoragePath(objectName);

  await supabaseRequest(`/storage/v1/object/${bucketPath}/${filePath}`, {
    method: "POST",
    headers: {
      "Content-Type": mimeType,
      "x-upsert": "true",
    },
    body: contentBytes,
    expectJson: false,
  });
}

async function downloadObject(objectName) {
  const config = getSupabaseConfig();
  const bucketPath = encodeURIComponent(config.bucket);
  const filePath = encodeStoragePath(objectName);
  return supabaseRequest(`/storage/v1/object/${bucketPath}/${filePath}`, {
    method: "GET",
    expectJson: false,
  });
}

async function listObjects(prefix = "") {
  const config = getSupabaseConfig();
  const bucketPath = encodeURIComponent(config.bucket);
  const payload = await supabaseRequest(`/storage/v1/object/list/${bucketPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prefix,
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "desc" },
    }),
  });
  return Array.isArray(payload) ? payload : [];
}

async function readArchiveSettings() {
  try {
    const { body } = await downloadObject(ARCHIVE_SETTINGS_OBJECT);
    return {
      ...defaultArchiveSettings(),
      ...JSON.parse(body.toString("utf8") || "{}"),
    };
  } catch {
    return defaultArchiveSettings();
  }
}

async function writeArchiveSettings(settings) {
  const merged = { ...defaultArchiveSettings(), ...(settings || {}) };
  await uploadObject(
    ARCHIVE_SETTINGS_OBJECT,
    "application/json; charset=utf-8",
    Buffer.from(JSON.stringify(merged, null, 2))
  );
  return merged;
}

async function saveArchiveSnapshot(dateKey, csv) {
  const objectName = snapshotObjectForDate(dateKey);
  await uploadObject(objectName, "text/csv; charset=utf-8", Buffer.from(String(csv || ""), "utf8"));
  return objectName;
}

async function listSupabaseArchives() {
  const config = getSupabaseConfig();
  const payload = await listObjects("");
  const archives = payload
    .filter((item) => /\.(csv|html|pdf)$/i.test(item.name || ""))
    .filter((item) => !(item.name || "").startsWith("__"))
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

async function archiveSnapshotForDate(dateKey, { force = false } = {}) {
  const settings = await readArchiveSettings();
  const snapshotObject = snapshotObjectForDate(dateKey);
  const filename = archiveFilenameForDate(dateKey);

  if (!force) {
    const existing = new Set((await listSupabaseArchives()).archives.map((archive) => archive.name));
    if (existing.has(filename)) {
      return { name: filename, url: `/api/archives/open?name=${encodeURIComponent(filename)}` };
    }
  }

  let snapshot;
  try {
    snapshot = await downloadObject(snapshotObject);
  } catch {
    throw new Error(`No saved schedule snapshot exists for ${dateKey}.`);
  }

  await uploadObject(filename, "text/csv; charset=utf-8", snapshot.body);
  settings.lastArchivedDate = dateKey;
  settings.lastArchivedAt = new Date().toISOString();
  await writeArchiveSettings(settings);

  return { name: filename, url: `/api/archives/open?name=${encodeURIComponent(filename)}` };
}

async function processArchiveBacklog(now = new Date()) {
  const settings = await readArchiveSettings();
  if (!settings.enabled) return [];

  const files = await listObjects(SNAPSHOT_PREFIX);
  const archived = [];
  for (const item of files.sort((a, b) => String(a.name).localeCompare(String(b.name)))) {
    const name = item.name || "";
    if (!name.startsWith(SNAPSHOT_PREFIX) || !name.endsWith(".csv")) continue;
    const dateKey = name.slice(SNAPSHOT_PREFIX.length, -4);
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

async function callOpenAIPlan(message, team, timeBlocks, history) {
  const apiKey = (process.env.OPENAI_API_KEY || "").trim();
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set.");

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

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, payload, status = 200) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function sendArchiveError(res, error) {
  sendJson(
    res,
    {
      error: "Supabase archive request failed.",
      details: error.details || error.message || String(error),
    },
    error.status || 502
  );
}

function sendPlanError(res, error) {
  sendJson(
    res,
    {
      error: "OpenAI API request failed.",
      details: error.details || error.message || String(error),
    },
    error.status || 502
  );
}

module.exports = {
  archiveSnapshotForDate,
  callOpenAIPlan,
  defaultArchiveSettings,
  downloadObject,
  getArchiveStatus,
  getSupabaseConfig,
  processArchiveBacklog,
  readArchiveSettings,
  readJsonBody,
  saveArchiveSnapshot,
  sendArchiveError,
  sendJson,
  sendPlanError,
  uploadObject,
  writeArchiveSettings,
};
