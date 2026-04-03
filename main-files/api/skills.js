const { readJsonBody, readSkillsMatrix, sendArchiveError, sendJson, writeSkillsMatrix } = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, skills: await readSkillsMatrix() });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      return sendJson(res, {
        ok: true,
        skills: await writeSkillsMatrix(data?.skills || {}),
      });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
