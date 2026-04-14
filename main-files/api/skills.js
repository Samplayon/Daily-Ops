const { readJsonBody, readRoster, readSkillsMatrix, sendArchiveError, sendJson, writeRoster, writeSkillsMatrix } = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, skills: await readSkillsMatrix(), roster: await readRoster() });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      const skills = Object.prototype.hasOwnProperty.call(data || {}, "skills")
        ? await writeSkillsMatrix(data?.skills || {})
        : await readSkillsMatrix();
      const roster = Object.prototype.hasOwnProperty.call(data || {}, "roster")
        ? await writeRoster(data?.roster || [])
        : await readRoster();
      return sendJson(res, {
        ok: true,
        skills,
        roster,
      });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
