const { readArchiveSettings, readJsonBody, sendArchiveError, sendJson, writeArchiveSettings } = require("../_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  try {
    const data = await readJsonBody(req);
    const settings = await readArchiveSettings();
    settings.enabled = Boolean(data.enabled);
    settings.time = data.time || settings.time || "00:00";
    if (data.automations && typeof data.automations === "object" && !Array.isArray(data.automations)) {
      settings.automations = data.automations;
    }
    return sendJson(res, { ok: true, settings: await writeArchiveSettings(settings) });
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
