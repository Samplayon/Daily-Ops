const { appendAuditLog, readAuditLog, readJsonBody, sendArchiveError, sendJson } = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, entries: await readAuditLog() });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      const entries = await appendAuditLog(data?.entry || {});
      return sendJson(res, { ok: true, entries });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
