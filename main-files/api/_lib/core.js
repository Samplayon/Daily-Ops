const OPENAI_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5.2";
const ARCHIVE_SETTINGS_OBJECT = "__config__-archive-settings.json";
const SNAPSHOT_PREFIX = "__snapshot__-";
const SCHEDULING_RULES_OBJECT = "__config__-scheduling-rules.json";
const AUDIT_LOG_OBJECT = "__config__-audit-log.json";
const ADMIN_PASSWORDS_OBJECT = "__config__-admin-passwords.json";
const CUSTOM_ASSIGNMENTS_OBJECT = "__config__-custom-assignments.json";
const SKILLS_MATRIX_OBJECT = "__config__-skills-matrix.json";

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

function defaultArchiveAutomationPreferences() {
  return {
    "rule-based-reshuffle": {
      enabled: false,
      time: "00:00",
    },
    "nightly-pdf-archive": {
      enabled: false,
      time: "00:00",
    },
  };
}

function normalizeArchiveAutomationPreferences(payload) {
  const defaults = defaultArchiveAutomationPreferences();
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return defaults;
  }

  return Object.fromEntries(
    Object.entries(defaults).map(([automationId, definition]) => {
      const entry = payload[automationId] || {};
      return [
        automationId,
        {
          enabled: Boolean(entry.enabled),
          time: String(entry.time || definition.time || "00:00"),
        },
      ];
    })
  );
}

function defaultArchiveSettings() {
  return {
    enabled: false,
    time: "00:00",
    lastArchivedDate: "",
    lastArchivedAt: "",
    automations: defaultArchiveAutomationPreferences(),
  };
}

function archiveFilenameForDate(dateKey) {
  return `${String(dateKey).trim()}.csv`;
}

function snapshotObjectForDate(dateKey) {
  return `${SNAPSHOT_PREFIX}${archiveFilenameForDate(dateKey)}`;
}

function addDaysToDateKey(dateKey, days = 0) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day + Number(days || 0), 12, 0, 0));
  return getDateKeyForTimezone(value, "UTC");
}

function getTimeZoneOffsetMinutes(date, timeZone = "America/New_York") {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const offsetText = parts.find((part) => part.type === "timeZoneName")?.value || "GMT+0";
  const match = offsetText.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
  if (!match) return 0;
  const [, sign, hoursText, minutesText = "00"] = match;
  const total = Number(hoursText) * 60 + Number(minutesText);
  return sign === "-" ? -total : total;
}

function buildDateForTimezone(dateKey, timeString, timeZone = "America/New_York") {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  const [hourText = "00", minuteText = "00"] = String(timeString || "00:00").split(":");
  const utcGuess = new Date(Date.UTC(year, month - 1, day, Number(hourText), Number(minuteText), 0, 0));
  const offsetMinutes = getTimeZoneOffsetMinutes(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offsetMinutes * 60_000);
}

function computeNextArchiveRun(now, settings) {
  const todayKey = getDateKeyForTimezone(now, "America/New_York");
  let candidate = buildDateForTimezone(todayKey, settings.time || "00:00", "America/New_York");
  if (candidate <= now) {
    candidate = buildDateForTimezone(addDaysToDateKey(todayKey, 1), settings.time || "00:00", "America/New_York");
  }
  return candidate;
}

function scheduledArchiveDueAt(dateKey, timeString) {
  return buildDateForTimezone(addDaysToDateKey(dateKey, 1), timeString || "00:00", "America/New_York");
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

function getDateKeyForTimezone(date = new Date(), timeZone = "America/New_York") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
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
    const parsed = {
      ...defaultArchiveSettings(),
      ...JSON.parse(body.toString("utf8") || "{}"),
    };
    parsed.automations = normalizeArchiveAutomationPreferences(parsed.automations);
    return parsed;
  } catch {
    return defaultArchiveSettings();
  }
}

async function writeArchiveSettings(settings) {
  const merged = { ...defaultArchiveSettings(), ...(settings || {}) };
  merged.automations = normalizeArchiveAutomationPreferences(merged.automations);
  await uploadObject(
    ARCHIVE_SETTINGS_OBJECT,
    "application/json; charset=utf-8",
    Buffer.from(JSON.stringify(merged, null, 2))
  );
  return merged;
}

function defaultSchedulingRules() {
  return {
    all: [""],
    support: [""],
    aco: [""],
  };
}

function defaultAuditLog() {
  return [];
}

function defaultAdminPasswords() {
  return {};
}

function defaultCustomAssignments() {
  return [];
}

function defaultSkillsMatrix() {
  return {};
}

function normalizeCustomAssignments(payload) {
  return Array.isArray(payload)
    ? [...new Set(payload.map((entry) => String(entry || "").trim()).filter(Boolean))]
    : defaultCustomAssignments();
}

function normalizeAdminPasswords(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return defaultAdminPasswords();
  }

  return Object.fromEntries(
    Object.entries(payload)
      .map(([key, value]) => [String(key || "").trim(), String(value || "").trim()])
      .filter(([key, value]) => key && value)
  );
}

function normalizeSkillsMatrix(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return defaultSkillsMatrix();
  }

  return Object.fromEntries(
    Object.entries(payload)
      .map(([personKey, skills]) => [
        String(personKey || "").trim(),
        Array.isArray(skills)
          ? [...new Set(skills.map((skill) => String(skill || "").trim()).filter(Boolean))]
          : [],
      ])
      .filter(([personKey]) => personKey)
  );
}

function normalizeAuditEntry(entry) {
  return {
    id: String(entry?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`),
    actorId: String(entry?.actorId || "").trim(),
    actorName: String(entry?.actorName || "Unknown").trim() || "Unknown",
    actorScope: String(entry?.actorScope || "all").trim() || "all",
    actionType: String(entry?.actionType || "update").trim() || "update",
    summary: String(entry?.summary || "").trim(),
    details: Array.isArray(entry?.details)
      ? entry.details.map((detail) => String(detail || "").trim()).filter(Boolean)
      : [],
    createdAt: String(entry?.createdAt || new Date().toISOString()),
  };
}

function normalizeSchedulingRules(payload) {
  const defaults = defaultSchedulingRules();
  if (Array.isArray(payload)) {
    return {
      all: payload.length ? payload.map((rule) => String(rule || "").trimEnd()) : [""],
      support: defaults.support,
      aco: defaults.aco,
    };
  }
  return {
    all: Array.isArray(payload?.all) && payload.all.length ? payload.all.map((rule) => String(rule || "").trimEnd()) : defaults.all,
    support: Array.isArray(payload?.support) && payload.support.length ? payload.support.map((rule) => String(rule || "").trimEnd()) : defaults.support,
    aco: Array.isArray(payload?.aco) && payload.aco.length ? payload.aco.map((rule) => String(rule || "").trimEnd()) : defaults.aco,
  };
}

async function readSchedulingRules() {
  try {
    const { body } = await downloadObject(SCHEDULING_RULES_OBJECT);
    return normalizeSchedulingRules(JSON.parse(body.toString("utf8") || "{}"));
  } catch {
    return defaultSchedulingRules();
  }
}

async function writeSchedulingRules(rules) {
  const normalized = normalizeSchedulingRules(rules);
  await uploadObject(
    SCHEDULING_RULES_OBJECT,
    "application/json; charset=utf-8",
    Buffer.from(JSON.stringify(normalized, null, 2))
  );
  return normalized;
}

async function readAuditLog() {
  try {
    const { body } = await downloadObject(AUDIT_LOG_OBJECT);
    const parsed = JSON.parse(body.toString("utf8") || "[]");
    return Array.isArray(parsed) ? parsed.map(normalizeAuditEntry) : defaultAuditLog();
  } catch {
    return defaultAuditLog();
  }
}

async function writeAuditLog(entries) {
  const normalized = Array.isArray(entries)
    ? entries.map(normalizeAuditEntry).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    : defaultAuditLog();

  await uploadObject(
    AUDIT_LOG_OBJECT,
    "application/json; charset=utf-8",
    Buffer.from(JSON.stringify(normalized, null, 2))
  );

  return normalized;
}

async function appendAuditLog(entry) {
  const existing = await readAuditLog();
  const nextEntries = [normalizeAuditEntry(entry), ...existing].slice(0, 250);
  return writeAuditLog(nextEntries);
}

async function readAdminPasswords() {
  try {
    const { body } = await downloadObject(ADMIN_PASSWORDS_OBJECT);
    return normalizeAdminPasswords(JSON.parse(body.toString("utf8") || "{}"));
  } catch {
    return defaultAdminPasswords();
  }
}

async function writeAdminPasswords(passwords) {
  const normalized = normalizeAdminPasswords(passwords);
  await uploadObject(
    ADMIN_PASSWORDS_OBJECT,
    "application/json; charset=utf-8",
    Buffer.from(JSON.stringify(normalized, null, 2))
  );
  return normalized;
}

async function readCustomAssignments() {
  try {
    const { body } = await downloadObject(CUSTOM_ASSIGNMENTS_OBJECT);
    return normalizeCustomAssignments(JSON.parse(body.toString("utf8") || "[]"));
  } catch {
    return defaultCustomAssignments();
  }
}

async function writeCustomAssignments(assignments) {
  const normalized = normalizeCustomAssignments(assignments);
  await uploadObject(
    CUSTOM_ASSIGNMENTS_OBJECT,
    "application/json; charset=utf-8",
    Buffer.from(JSON.stringify(normalized, null, 2))
  );
  return normalized;
}

async function readSkillsMatrix() {
  try {
    const { body } = await downloadObject(SKILLS_MATRIX_OBJECT);
    return normalizeSkillsMatrix(JSON.parse(body.toString("utf8") || "{}"));
  } catch {
    return defaultSkillsMatrix();
  }
}

async function writeSkillsMatrix(skillsMatrix) {
  const normalized = normalizeSkillsMatrix(skillsMatrix);
  await uploadObject(
    SKILLS_MATRIX_OBJECT,
    "application/json; charset=utf-8",
    Buffer.from(JSON.stringify(normalized, null, 2))
  );
  return normalized;
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
      automations: normalizeArchiveAutomationPreferences(settings.automations),
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
  appendAuditLog,
  archiveSnapshotForDate,
  callOpenAIPlan,
  defaultAdminPasswords,
  defaultArchiveAutomationPreferences,
  defaultArchiveSettings,
  downloadObject,
  getArchiveStatus,
  getDateKeyForTimezone,
  getSupabaseConfig,
  processArchiveBacklog,
  readAdminPasswords,
  readCustomAssignments,
  readSkillsMatrix,
  readAuditLog,
  readArchiveSettings,
  readJsonBody,
  readSchedulingRules,
  saveArchiveSnapshot,
  sendArchiveError,
  sendJson,
  sendPlanError,
  uploadObject,
  writeAdminPasswords,
  writeCustomAssignments,
  writeSkillsMatrix,
  writeArchiveSettings,
  writeAuditLog,
  writeSchedulingRules,
};
