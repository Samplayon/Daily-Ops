const {
  readAdminPasswords,
  readJsonBody,
  sendArchiveError,
  sendJson,
  writeAdminPasswords,
} = require("./_lib/core");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return sendJson(res, { ok: true, passwords: await readAdminPasswords() });
    }

    if (req.method === "POST") {
      const data = await readJsonBody(req);
      return sendJson(res, { ok: true, passwords: await writeAdminPasswords(data?.passwords || {}) });
    }

    return sendJson(res, { error: "Method not allowed." }, 405);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
