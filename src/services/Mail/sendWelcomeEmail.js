const sendgrid = require("@sendgrid/mail");
const config = require("../../config");
const logger = require("../../lib/logger");

const wrapServiceAction = require("../_core/wrapServiceAction");

const templates = require("./templates");

const { email, any } = require("../../validation");

const PlatformConfigService = require("../PlatformConfig");
const { ConfigKeys } = require("../PlatformConfig/types");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    user: { ...any },
    email: { ...email }
  },
  async handler(params) {
    const settings = await PlatformConfigService.getConfig();
    const platformKey = settings[ConfigKeys.SENDGRID_API_KEY];
    sendgrid.setApiKey(platformKey || config.sendgrid.apiKey);

    const options = {
      from: {
        email: `developer@${config.app.domain}`,
        name: config.app.name
      },
      to: params.email,
      subject: "Welcome",
      html: templates.welcome.body
        .replace("{{ platform.logo }}", config.app.logo)
        .replace("{{ platform.name }}", config.app.name)
        .replace("{{ platform.domain }}", config.app.domain)
        .replace("{{ user.first_name }}", params.user.first_name)
    };

    try {
      return await sendgrid.send(options);
    } catch (e) {
      logger.error(e);
      return false;
    }
  }
});
