const expressAsyncHandler = require('express-async-handler');
const services = require('../services');
const jwt = require('jsonwebtoken');

const { google } = require('googleapis');
const { Event } = require('../models');
const RefreshToken = require('../models/refreshToken');
const { default: axios } = require('axios');
// TODO:
const redirectURI = "/api/v1/calendar/auth";
require('dotenv').config();

const GOOGLE_CLIENT_ID = '102076896830-4il8ncmrd6qfoippk2ut4uujb8cci54v.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'OcmROq2htzy7m4RDswBiEVXO'
const SERVER_ROOT_URI = ''

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'https://catchup.hng.tech'
)
const calendar = google.calendar({ version: 'v3' });

const createTokens = (email, refresh_token) => {
  try {
    new RefreshToken({email, refresh_token}).save()
  } catch(e){
    console.log(e)
  }
}

function getGoogleAuthURL () {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/calendar",
    ].join(" "),
  };
  return `${rootUrl}?${URLSearchParams.toString(options)}`;
}

// Insert Event Into Controller
const insertCalendar = async (event, email) => {
  try {
    const refresh_token = RefreshToken.findOne({email: email})
    oauth2Client.setCredentials({refresh_token: refresh_token})

    await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: event
    });

    return true;
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return false
  }
};

// Save Event in Calendar
const saveEvent = expressAsyncHandler(async (req, res, next) => {
  const params = req.params.id
  
  try {
    const decoded = jwt.verify(params, process.env.INVITATION_TOKEN_SECRET)

    await RefreshToken.find({email: decoded.email}, (err, data)=>{
      if(data.length == 0){
        let authUrl = getGoogleAuthURL()
        return res.writeHead(301, {
          Location: authUrl
        }).end();
      }
    })

    Event.findOne(
      { _id: decoded.event_id },
      async (err, data) => {
        if (err) {
          return services.createSendToken({}, 'error', err, res);
        }
        
        let event = {
          summary: data['event_title'],
          description: data['event_description'],
          start: {
              dateTime: new Date(data['start_date'])
          },
          end: {
              dateTime: new Date(data['end_date'])
          },
          location: data['location'],
          colorId: '7'
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

// Getting the refresh token from Google with the code
const getRefreshToken = async (req, res) => {
  const code = req.query.code;

  const { refresh_token, access_token, id_token } = await getTokens({
    code,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
  });

  const googleUser = await axios
  .get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }
  )
  .then((res) => res.data)
  .catch((error) => {
    console.error(`Failed to fetch user`);
    throw new Error(error.message);
  });

  await createTokens(googleUser.email, refresh_token)
  res.send('Succesfully synced your calendar! Now Click on the event link again to add to calendar');
};

async function getTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}) {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios
      .post(url, querystring.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch auth tokens`);
    throw new Error(error.message);
  }
}

module.exports = {
  saveEvent,
  getRefreshToken
};
