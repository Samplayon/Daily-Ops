const { readCustomAssignments, sendArchiveError, sendJson, writeCustomAssignments, readJsonBody } = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, assignments: await readCustomAssignments() });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      return sendJson(res, {
        ok: true,
        assignments: await writeCustomAssignments(data?.assignments || []),
      });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
