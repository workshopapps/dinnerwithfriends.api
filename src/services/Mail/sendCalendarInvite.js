const sendgrid = require('@sendgrid/mail');
const templates = require('./templates');

const sendCalendarLink = async (token, email) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.SENDGRID_API_KEY);

  const options = {
    from: {
      email: `hello@catchup.ng`,
      name: 'Catch Up Calendar',
    },
    to: email,
    subject: 'Catchup Calendar Invitation',
    html: templates.sendCalendarMail.body.replace(
      '{{ calendarLink }}',
      token
    ),
  };

  return await sendgrid.send(options);
};

module.exports = sendCalendarLink;
