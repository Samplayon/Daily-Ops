const { archiveSnapshotForDate, readJsonBody, saveArchiveSnapshot, sendArchiveError, sendJson } = require("../_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  try {
    const data = await readJsonBody(req);
    const dateKey = data.date || new Date().toISOString().slice(0, 10);
    const csv = data.html || "";
    await saveArchiveSnapshot(dateKey, csv);
    const saved = await archiveSnapshotForDate(dateKey, { force: true });
    return sendJson(res, {
      ok: true,
      message: `Saved archive to Supabase as ${saved.name}`,
      archive: saved,
    });
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
