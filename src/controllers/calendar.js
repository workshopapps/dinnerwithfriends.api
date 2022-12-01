const expressAsyncHandler = require('express-async-handler');
const services = require('../services');

const { google } = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS =
  //JSON.parse(
  process.env.CREDENTIALS;
//);

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Insert Event Into Controller
const insertCalendar = expressAsyncHandler(async (req, res, next) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: req.body.calendarId,
      resource: req.body.event,
    });

    if (response['status'] == 200 && response['statusText'] === 'OK') {
      const message = 'Successfully added event into calendar';
      return services.newEventToken({}, 'success', message, res);
    } else {
      return services.createSendToken({}, 'error', response['statusText'], res);
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return services.createSendToken({}, 'error', error, res);
  }
});

// Get Event in Calendar
const getCalendar = expressAsyncHandler(async (req, res, next) => {
  try {
    let response = await calendar.events.list({
      auth: auth,
      calendarId: req.body.calendarId,
      timeMin: req.body.dateTimeStart,
      timeMax: req.body.dateTimeEnd,
      timeZone: 'Asia/Kolkata',
    });

    console.log(response);

    let items = response['data']['items'];
    const message = 'Successfully fetched events in calendar';
    return services.newEventToken(items, 'success', message, res);
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return services.createSendToken({}, 'error', error, res);
  }
});

// Delete Event in Calendar
const deleteCalendar = expressAsyncHandler(async (req, res, next) => {
  try {
    let response = await calendar.events.delete({
      auth: auth,
      calendarId: req.body.calendarId,
      eventId: req.body.eventId,
    });

    if (response.data === '') {
      const message = 'Successfully deleted event in calendar';
      return services.newEventToken({}, 'success', message, res);
    } else {
      return services.createSendToken(
        {},
        'error',
        'Something ent wrong hilt deleting',
        res
      );
    }
  } catch (error) {
    console.log(`Error at deleteEvent --> ${error}`);
    return services.createSendToken({}, 'error', error, res);
  }
});

module.exports = {
  getCalendar,
  deleteCalendar,
  insertCalendar,
};
