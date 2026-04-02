const { readJsonBody, readSchedulingRules, sendArchiveError, sendJson, writeSchedulingRules } = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, rules: await readSchedulingRules() });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      return sendJson(res, { ok: true, rules: await writeSchedulingRules(data?.rules || {}) });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
