/* eslint-disable linebreak-style */
const nodemailer = require('nodemailer');

const { Contact } = require('../models');

const sendEmail = async (req, res, next) => {
// Create a transporter object for sending emails
  const { email, name, text } = req.body;

  if (!email || !name || !text) {
    return res.status(400).json({
      error: 'Email, name and text are required fields.',
    });
  }
  const newContact = Contact.create({ email });
  // const allcontact = await Contact.find({});
  // console.log(allcontact);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'onedayfee@gmail.com',
      pass: 'rqakmqrvlgqqojdm',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Set up the email details
  const mailOptions = {
    from: `${email}`,
    to: 'onyedikaufelle@gmail.com',
    subject: `Email from ${email}, Name: ${name}`,
    text,
  };

  console.log(req.body);
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  return res.status(200).json({
    status: 'success',
    message: 'email sent successfully',
  });
};

module.exports = { sendEmail };
