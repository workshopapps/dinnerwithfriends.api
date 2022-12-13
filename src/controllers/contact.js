/* eslint-disable linebreak-style */
const nodemailer = require('nodemailer');

const sendEmail = (req, res, next) => {
// Create a transporter object for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'onedayfee@gmail.com',
      pass: 'Drfate12',
    },
  });

  // Set up the email details
  const mailOptions = {
    from: req.body.email,
    to: 'onyedikaufelle@gmail.com',
    subject: req.body.name,
    text: req.body.text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = { sendEmail };
