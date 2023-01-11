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
      html: templates.sendCalendarMail.body.replace('{{ calendarLink }}', mail),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
};

const sendEventMail = (event, recipient) => {
  const eventObj = {
    title: event.event_title,
    description: event.event_description,
    location: event.location,
    final_event_date: new Date(event.final_event_date),
  };
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
      text: JSON.stringify(eventObj),
      html: templates.sendEventScheduleDetails.body
        .replace('{{ title }}', eventObj.title)
        .replace('{{ description }}', eventObj.description)
        .replace('{{ location }}', eventObj.location)
        .replace('{{ final_event_date }}', eventObj.final_event_date),
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
  sendCalendar,
  sendEventMail,
};
