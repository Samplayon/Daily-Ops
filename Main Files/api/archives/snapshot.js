const { processArchiveBacklog, readJsonBody, saveArchiveSnapshot, sendArchiveError, sendJson } = require("../_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  try {
    const data = await readJsonBody(req);
    const dateKey = data.date || new Date().toISOString().slice(0, 10);
    const csv = data.html || "";
    await saveArchiveSnapshot(dateKey, csv);
    const archived = await processArchiveBacklog();
    return sendJson(res, { ok: true, archived: archived.map((entry) => entry.name) });
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
