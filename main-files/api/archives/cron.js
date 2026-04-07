const { processArchiveBacklog, readArchiveSettings, sendArchiveError, sendJson } = require("../_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  try {
    const settings = await readArchiveSettings();
    if (!settings.enabled) {
      return sendJson(res, { ok: true, skipped: true, reason: "Nightly archive is disabled." });
    }

    const archived = await processArchiveBacklog(new Date());
    return sendJson(res, {
      ok: true,
      archivedCount: archived.length,
      archives: archived,
      message: archived.length
        ? `Processed ${archived.length} due archive${archived.length === 1 ? "" : "s"}.`
        : "No due archives were waiting to be processed.",
    });
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
