const { getArchiveStatus, defaultArchiveSettings, sendArchiveError, sendJson } = require("../_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  try {
    return sendJson(res, await getArchiveStatus());
  } catch (error) {
    return sendJson(
      res,
      {
        folder: "Supabase bucket: Daily Ops Archives",
        archives: [],
        settings: defaultArchiveSettings(),
        error: error.message,
        details: error.details || error.message,
      },
      400
    );
  }
};
