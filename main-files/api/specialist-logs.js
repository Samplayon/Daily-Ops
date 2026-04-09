const { appendSpecialistLog, readJsonBody, readSpecialistLogs, sendArchiveError, sendJson } = require("./_lib/core");

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, entries: await readSpecialistLogs() });
    }

    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const entries = await appendSpecialistLog(body || {});
      return sendJson(res, { ok: true, entries });
    }

    res.setHeader("Allow", "GET, POST");
    return sendJson(res, { ok: false, error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
