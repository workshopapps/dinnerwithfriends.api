const nodemailer = require('nodemailer');
const templates = require('../templates');

const sendMail = (mail, recipient) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      // host: process.env.MAIL_HOST,
      // port: process.env.MAIL_PORT,
      // secure: false,
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailOptions = {
      from: 'Catch',
      to: recipient,
      subject: 'Catch Up',
      text: mail,
      html: templates.sendInvitationLink.body.replace(
        '{{ invitationLink }}',
        mail
      ),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
};

const sendCalendar = (mail, recipient) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      // host: process.env.MAIL_HOST,
      // port: process.env.MAIL_PORT,
      // secure: false,
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailOptions = {
      from: 'Catch',
      to: recipient,
      subject: 'Catch Up Calendar Invite',
      text: mail,
      html: templates.sendCalendarMail.body.replace(
        '{{ calendarLink }}',
        mail
      ),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
};

module.exports = {
  sendMail,
  sendCalendar
};
