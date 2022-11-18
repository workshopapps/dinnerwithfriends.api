const sendgrid = require("@sendgrid/mail");
const useragent = require("useragent");
const config = require("../../config");
const logger = require("../../lib/logger");


const wrapServiceAction = require("../_core/wrapServiceAction");

const templates = require("./templates");

const { email, any, string } = require("../../validation");

const PlatformConfigService = require("../PlatformConfig");
const { ConfigKeys } = require("../PlatformConfig/types");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    token: { ...any },
    email: { ...email },
    ip: { ...string },
    useragent: { ...string },
  },
  async handler(params) {
    const settings = await PlatformConfigService.getConfig();
    const platformKey = settings[ConfigKeys.SENDGRID_API_KEY];
    sendgrid.setApiKey(platformKey || config.sendgrid.apiKey);

    const agent = useragent.parse(params.useragent);
    let device = `${agent.family} ${agent.os}`;

    if (params.useragent.includes("mobile-agent|")) {
      device = params.useragent.split("|")[1];
    }

    const options = {
      from: {
        email: `developer@${config.app.domain}`,
        name: config.app.name
      },
      to: params.email,
      subject: "Verify login",
      html: templates.newDevice.body
        .replace("{{ platform.logo }}", config.app.logo)
        .replace("{{ code }}", params.token)
        .replace("{{ ip }}", params.ip)
        .replace("{{ device }}", device)
    };

    try {
      return await sendgrid.send(options);
    } catch (e) {
      logger.error(e);
      return false;
    }
  }
});
