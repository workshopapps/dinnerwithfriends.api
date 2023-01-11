const sendgrid = require('@sendgrid/mail');
const templates = require('./templates');

const sendInvitationLink = async (token, email) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.SENDGRID_API_KEY);

  const options = {
    from: {
      email: `lordorion066@gmail.com`,
      name: 'Catch Up',
    },
    to: email,
    subject: 'Catchup Invitation',
    html: templates.sendInvitationLink.body.replace(
      '{{ invitationLink }}',
      token
    ),
  };

  return await sendgrid.send(options);
};

module.exports = sendInvitationLink;
