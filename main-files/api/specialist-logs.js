const { appendSpecialistLog, readJsonBody, readSpecialistLogs, sendArchiveError, sendJson } = require("./_lib/core");

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      return sendJson(res, 200, { ok: true, entries: await readSpecialistLogs() });
    }

    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const entries = await appendSpecialistLog(body || {});
      return sendJson(res, 200, { ok: true, entries });
    }

    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { ok: false, error: "Method not allowed." });
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
