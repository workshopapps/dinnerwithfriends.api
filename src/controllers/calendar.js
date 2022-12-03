const expressAsyncHandler = require('express-async-handler');
const services = require('../services');

const { google } = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = {
  type: 'service_account',
  project_id: 'confident-facet-364012',
  private_key_id: '1f817510d3efade14b09de482b156c00bccf6e21',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCr2/kpAYU2YUuR\nexWuEI+z83T+DbNfeRJxo4MS/7ko17Xav16REGYd3SoHqnWy6lUQ02Enml4wp4eC\nmnaHicsLoqwYE6NCVbBMwFvXsv6JK3vwiuL94N1FGGalRG47WW4kp7XqM4KxjhN6\ntfGnMs+bA5j2LOJDBCcErmA7iiPNerqQVeaPPRR6JLqlBPxzhh0r4qr6sdmuk86E\nDY9UrrOGQ+Ux3qtr/zhrtUdGpkZS5l4TmjWPjD4vsJQz+uHgMMl31bsGukZxDnfG\nQEYuT9QYb49/1pWtB5DWHWn3jh1mXMLCBqkNHccEeqQzVRWQKroygxbXlztuNtvn\nbxw2y+yFAgMBAAECggEADMSiBUbko76kw6E2YiE+2+q5hWp1KiGvmhvA0DeJhRxJ\nmX/gQbzLKWrWBY3HgsxgF4jszeltGAZKTgy1w6ocGLg0OvGyjmoZWApuiF73BC/j\n3GIlLSF4rvp6HcswuV4Sjcyb+lNrYU+h6Nr9oiNnQygIRDnfcYUsdO+TnLjNoiVd\n7Q2iNoJ2Dut7qVoA0WTmbJ8rbMDaR5lcnrFykm/moMlm9B7Y54xEeNizGCenWjhP\nqRomnJmCr7ViZTAusLs0kOb+3Y9irdmuive9GxoyhbUgBSB52YwilC70yJqrBeHY\n27kJa+HT+mf4HhbRo736DrbnhF+gcQiQSbX7c+0IwQKBgQDVXBTxr7M2+poOTNi1\nCY/JqYHUzij3jXIZiK7j5W0RP2LKTMBoWYeK+EfSVmkNZWBQyyRPFjNaRwI9ELOC\nVQUitq3F0ghtHu3tzEGtdMlar3T9JTJm4WoEXFWktk0Q038sKRRiKonLAlg3k67X\nlvbVDUUY8ji9XcVibPbB79qtFQKBgQDONKUaTQWny+iLzsC/vjTMQKAISM6L+9IK\nXWxg4r6N/5Uk6OoNG1gT0DfHOtwjOE571PUnKFGemac8qUTAL4iKTe3fMv/BmI/g\npIqN2Xn7BMjZAUk5kpHROvmCtwEHf1BGBMnWUiJsnfofVOMxlpZiI3Te3FF2gsyT\nEbiy7Xt9sQKBgEjzWxXoBVbfCJ2rGM2Nn2RMWN/yPX+nFUQ1v9acM1aaXaTd6UvE\nkNurWKNKeFDkQLJfQuLnrFdJwDIw66+8ci0UWQYycj8dPCz6kdpE/DPNmiqT9U/H\n8v/ask3HJ0KBjhIDWbzW3pZTDuax0C5Wp77g8qc86rmUvlCRAS3+XL6hAoGAM8yX\nuO6mQAuCBDTQyJnwS2rkiJA5ioKctcvYINJ0ydjtT1NPEDHRQ1Dn4h1QFWzcklDh\nsI95SV0R3LQsuBZ4tz1yRsJZ6vj3E5hh0dZSxRLjnVesXFEMXkHxUbvE/2wk7yHe\nzf7d9OkOXvaFB/zrFAYSIrW3pQygdUVbX182yVECgYAlhtBwb2T/cXezCQqONB/a\nyX6a5X3PwG1JEoBXXlrXb2FsX64vDdcQIuHQGhCSQ8wYr4HloIxwbqtdOt2nn3x7\nVBADOS+33hjwq5hIH7238UqGTl12nSYHxS2Q2m3GLlEX9ys5Zf8dvOLS4t933OJz\nC0rjmj/8zR8368XA2X8QpQ==\n-----END PRIVATE KEY-----\n',
  client_email: 'i123456@confident-facet-364012.iam.gserviceaccount.com',
  client_id: '102254133935705883736',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/i123456%40confident-facet-364012.iam.gserviceaccount.com',
};

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
