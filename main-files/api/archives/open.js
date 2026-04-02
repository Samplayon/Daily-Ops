const { downloadObject, sendArchiveError, sendJson } = require("../_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  const archiveName = String(req.query?.name || "").replace(/^.*[\\/]/, "");
  if (!archiveName) {
    res.statusCode = 404;
    res.end("Archive not found.");
    return;
  }

  try {
    const { body, contentType } = await downloadObject(archiveName);
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType || "text/csv; charset=utf-8");
    res.end(body);
  } catch (error) {
    return sendArchiveError(res, error);
  }
};
