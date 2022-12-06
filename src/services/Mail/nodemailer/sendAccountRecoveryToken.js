const nodemailer = require('nodemailer');
const templates = require('../templates');

const sendMail = (token, recipient) => {
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
      text: token,
      html: templates.accountRecoveryToken.body.replace('{{ code }}', token),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
};

module.exports = sendMail;
