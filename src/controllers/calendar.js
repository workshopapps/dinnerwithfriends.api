const expressAsyncHandler = require('express-async-handler');
const services = require('../services');
const jwt = require('jsonwebtoken');

const { google } = require('googleapis');
const { Event } = require('../models');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = {
  type: "service_account",
  project_id: "gisthive-192713",
  private_key_id: "a02262fba03f1ea6c5d76305c611b5bc2bc2c518",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDNT8/54WLf5FyU\n9XGKhIzRAoA6tbK2oI2bpLJIm1sNehgIEWBSh1XDYIJHfLsnMLo4hr9+HHRZ19Tt\nR5XjrGdgtqkixwbEL30WCUceidVTw34bgDMXADwoAwwoA6mmGOYRU+ByIKDjpLzo\nG9/eAJK26M/2Nv6O0EW88CNK4IfvrIHe7Tv6aLRjRZABGQFQEZCJcmjC+vYQ0z0C\nL2OvJmifFO/L8dHsTS+dFlWQaKkW/wcSqUV6iogEaKkKxAKIIqe+5EGufsnUqJO2\nZKgLZVR2cIJfj3J8Nm4/vbUJ+9aV3CU8/pgBlmzPoMUWAQNsQoDDzDlNsCNVZnkA\nNLsg11ODAgMBAAECggEADJf8teMxYXJsi2aS1GBVEu0IWJGUqMcoaIett+5vo1/9\n4WDPe8B5bkaZNzFbeYfvpE//pwivymMG2Jcvhouou7H4pf13WMlg7t0a07C4uS6g\nqacvexW0mu+06y9uVJXqZt2yQs3lkJEmVUaAcOmwFjApsXymGLSF0pUYVRt4uybJ\nnZ9RFRQB7zBTnKSauYOrJQSGwWBUAlk27nH3f7g4NmHCqx5Shap3o512+trlDxmO\nkJTUsKXtYfI3zrjkp/Ze/hR8V7rfLm7zqc4UZ7HoVSNx+9zTAfvw4BSYiLYlbHx/\n8VIb4NpP/a4KnziCS1keCuLtKgSu0r6Ft1UaSsix4QKBgQDrvD3ypAuxKt9ZPWPJ\nQbbUbVNsXTO+X01h4fPRlB9PPCPewznPeDWZkE3vx0TaQrCbL5f5/JT3y2N/J07y\nh5GPVqDLQh3zOoxDwuvBU3dpEvMdvOn3olqh7wyLhEHUHczBZ8qIJ6Yut+l/rL75\nPEpBqJAmlNcupFaX05zyCg3AxwKBgQDe9gxYFhpWT/HhXpFXww7IzW55mg4yruXO\naUgu6N1UEAermNSwbq4L2wp2EVzfQm+vQNho8jPXjd6WmMcfvaK87omc35CKnERs\n8RGYqMDUx1tQz43cvefXxsqYf/OyUTgebmsBpxu/PUk1yt+ecn2icw21r9B/C2d5\n5FNqVoiTZQKBgGDR5suSju7MQgGgEizl3Zav9FSMjyUAdYLfT8njQVzEwaLLoiHR\nKIqS1z/FI0VVoL2MNapKEFEZ6xqdZXJ9Nc6ecNoqpKxyfouSMkwr4N56Fvo+zgWU\nXA8oZImk33ikaKWC4I89YabMiI2UwLcTCRigh9wgw6R3gM1I76wFbxKfAoGAffi+\nmLZEQygAHbl0nQVUQRfwpzvncbNnm+vYIMjo5Cn6a3V6FgUyyPgFPRgqROogeABH\nRWQy7kL11FiViNV4MQ8FKWEXJXmNH5BExN/zs0S/zzS1jlatuzhSFz+TzNgewPLZ\n+qEUCET0LDRni/pcCYC/6jtfragf2rqqdpZVrBECgYBXjqfqCoeOaeWixH4cRBiV\nlRUk0PLxvlvIny4MoVCbg3ynd7fe0r1DeFG5tkke4vv9esfc/Iy0tmy/YKRw0WD4\nOyQkwFPGXU63ilR22rXmCeB4aJIjDXVo5rcMOSnO6iOIyErP5FsRia7Gx7RdM4Rn\npucxJOAO8oxJNs0JVhPuOA==\n-----END PRIVATE KEY-----\n",
  client_email: "gisthive@gisthive-192713.iam.gserviceaccount.com",
  client_id: "106517936676260485570",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/gisthive%40gisthive-192713.iam.gserviceaccount.com"
}


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
const insertCalendar = async (event, calendarId) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response['status'] == 200 && response['statusText'] === 'OK') {
      const message = 'Successfully added event into calendar';
      console.log('SUCCESS')
      return true;
      // return services.newEventToken({}, 'success', message, {message: 'success'});
    } else {
      console.log('error')
      console.log(response)
      return false;
      // return services.createSendToken({}, 'error', response['statusText'], {message: 'error'});
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return false
    // return services.createSendToken({}, 'error', error, {message: 'erroe'});
  }
};

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

// Save Event in Calendar
const saveEvent = expressAsyncHandler(async (req, res, next) => {
  const params = req.params.id
  console.log(params)
  try {
    const decoded = jwt.verify(params, process.env.INVITATION_TOKEN_SECRET)

    Event.findOne(
      { _id: decoded.event_id },
      async (err, data) => {
        if (err) {
          return services.createSendToken({}, 'error', err, res);
        }
        
        let event = {
          'summary': data['event_title'],
          'description': data['event_description'],
          'start': {
              'dateTime': `${data['start_date']}T00:00:00.000Z`,
              'timeZone': 'Asia/Kolkata'
          },
          'end': {
              'dateTime': `${data['end_date']}T00:00:00.000Z`,
              'timeZone': 'Asia/Kolkata'
          }
        }

        await insertCalendar(event, decoded.email)

        return res.writeHead(301, {
          Location: 'https://calendar.google.com'
        }).end();
      },
    );

    
  } catch (error) {
    console.log(`Error at saveEvent --> ${error}`);
    return services.createSendToken({}, 'error', error, res);
  }
});

module.exports = {
  getCalendar,
  deleteCalendar,
  insertCalendar,
  saveEvent
};
