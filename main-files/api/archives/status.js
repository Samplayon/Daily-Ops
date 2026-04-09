const {
  getArchiveStatus,
  defaultArchiveSettings,
  readArchiveSettings,
  readJsonBody,
  sendArchiveError,
  sendJson,
  writeArchiveSettings,
} = require('../_lib/core');

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return sendJson(res, await getArchiveStatus());
    }

    if (req.method === 'POST') {
      const data = await readJsonBody(req);
      const settings = await readArchiveSettings();
      settings.enabled = Boolean(data.enabled);
      settings.time = data.time || settings.time || '00:00';
      if (data.automations && typeof data.automations === 'object' && !Array.isArray(data.automations)) {
        settings.automations = data.automations;
      }
      return sendJson(res, { ok: true, settings: await writeArchiveSettings(settings) });
    }

    return sendJson(res, { error: 'Method not allowed.' }, 405);
  } catch (error) {
    if (req.method === 'GET') {
      return sendJson(
        res,
        {
          folder: 'Supabase bucket: Daily Ops Archives',
          archives: [],
          settings: defaultArchiveSettings(),
          error: error.message,
          details: error.details || error.message,
        },
        400
      );
    }

    return sendArchiveError(res, error);
  }
};
