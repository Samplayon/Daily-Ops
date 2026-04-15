const { readCustomAssignments, sendArchiveError, sendJson, writeCustomAssignments, readJsonBody } = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const payload = await readCustomAssignments();
      return sendJson(res, {
        ok: true,
        assignments: payload.assignments || [],
        hiddenBuiltIns: payload.hiddenBuiltIns || [],
        colors: payload.colors || {},
      });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      const payload = await writeCustomAssignments({
        assignments: data?.assignments || [],
        hiddenBuiltIns: data?.hiddenBuiltIns || [],
        colors: data?.colors || {},
      });
      return sendJson(res, {
        ok: true,
        assignments: payload.assignments || [],
        hiddenBuiltIns: payload.hiddenBuiltIns || [],
        colors: payload.colors || {},
      });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
