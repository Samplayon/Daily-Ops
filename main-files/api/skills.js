const { readJsonBody, readRoster, readShiftOverrides, readSkillsMatrix, sendArchiveError, sendJson, writeRoster, writeShiftOverrides, writeSkillsMatrix } = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, skills: await readSkillsMatrix(), roster: await readRoster(), shiftOverrides: await readShiftOverrides() });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      const skills = Object.prototype.hasOwnProperty.call(data || {}, "skills")
        ? await writeSkillsMatrix(data?.skills || {})
        : await readSkillsMatrix();
      const roster = Object.prototype.hasOwnProperty.call(data || {}, "roster")
        ? await writeRoster(data?.roster || [])
        : await readRoster();
      const shiftOverrides = Object.prototype.hasOwnProperty.call(data || {}, "shiftOverrides")
        ? await writeShiftOverrides(data?.shiftOverrides || {})
        : await readShiftOverrides();
      return sendJson(res, {
        ok: true,
        skills,
        roster,
        shiftOverrides,
      });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
