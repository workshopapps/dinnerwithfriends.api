const sendgrid = require('@sendgrid/mail');
const templates = require('./templates');

const sendAccountRecoveryToken = async (token, email) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.SENDGRID_API_KEY);

  const options = {
    from: {
      email: `lordorion066@gmail.com`,
      name: 'Catch Up',
    },
    to: email,
    subject: 'Recover Your Account',
    html: templates.accountRecoveryToken.body.replace('{{ code }}', token),
  };

  return await sendgrid.send(options);
};

module.exports = sendAccountRecoveryToken;
