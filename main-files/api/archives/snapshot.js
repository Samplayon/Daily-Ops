const { getDateKeyForTimezone, processArchiveBacklog, readJsonBody, saveArchiveSnapshot, sendArchiveError, sendJson } = require("../_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  try {
    const data = await readJsonBody(req);
    const dateKey = data.date || getDateKeyForTimezone(new Date(), "America/New_York");
    const csv = data.html || "";
    await saveArchiveSnapshot(dateKey, csv);
    const archived = await processArchiveBacklog();
    return sendJson(res, { ok: true, archived: archived.map((entry) => entry.name) });
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
