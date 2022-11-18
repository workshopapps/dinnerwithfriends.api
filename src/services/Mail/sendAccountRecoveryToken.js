const sendgrid = require("@sendgrid/mail");
const config = require("../../config");

const wrapServiceAction = require("../_core/wrapServiceAction");

const templates = require("./templates");

const { email, any } = require("../../validation");

const PlatformConfigService = require("../PlatformConfig");
const { ConfigKeys } = require("../PlatformConfig/types");

module.exports = wrapServiceAction({
  params: {
    $$strict: "remove",
    token: { ...any },
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
      subject: "Recover Your Account",
      html: templates.accountRecoveryToken.body
        .replace("{{ platform.logo }}", config.app.logo)
        .replace("{{ code }}", params.token)
    };

    return await sendgrid.send(options);
  }
});
