const { callOpenAIPlan, readJsonBody, sendJson, sendPlanError } = require("./_lib/core");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, { error: "Method not allowed." }, 405);
  }

  try {
    const data = await readJsonBody(req);
    const plan = await callOpenAIPlan(
      data.message || "",
      data.team || [],
      data.timeBlocks || [],
      data.history || []
    );
    return sendJson(res, { plan, powered_by: "openai" });
  } catch (error) {
    return sendPlanError(res, error);
  }
};
