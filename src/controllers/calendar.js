const expressAsyncHandler = require('express-async-handler');
const services = require('../services');
const jwt = require('jsonwebtoken');

const { google } = require('googleapis');
const { Event } = require('../models');
const RefreshToken = require('../models/refreshToken');
const { default: axios } = require('axios');
const moment = require('moment/moment');
var querystring = require('querystring');
// TODO:
const redirectURI = "http://localhost:3998/api/v1/calendar/auth";
require('dotenv').config();

const GOOGLE_CLIENT_ID = '102076896830-4il8ncmrd6qfoippk2ut4uujb8cci54v.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'OcmROq2htzy7m4RDswBiEVXO'
const SERVER_ROOT_URI = ''

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'https://catchup.rsvp'
)
const calendar = google.calendar({ version: 'v3' });

// URL TO CHECK IF USER HAS TOKEN
const checkIfHasRefreshToken = expressAsyncHandler(async(req, res) => {
  await RefreshToken.find({email: email}, (err, data)=>{
    if(data.length == 0){
      return services.createSendToken({}, 'success', 'user has connected calendar', res);
    } else {
      return services.createSendToken({}, 'error', 'user has not connected calendar', res);
    }
  })
})

// SEND USER TO AUTHENTICATE
const sendUserToAuthenticate = expressAsyncHandler(async(req, res) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
  const options = {
    redirect_uri: `${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/calendar",
    ].join(" "),
  };
  let authUrl = `${rootUrl}?redirect_uri=${options.redirect_uri}&client_id=${options.client_id}&access_type=${options.access_type}&response_type=${options.response_type}&prompt=${options.prompt}&scope=${options.scope}`;
  console.log(authUrl)
      return res.writeHead(301, {
        Location: authUrl
      }).end();
  })

// Insert Event Into Controller
const insertCalendar = async (event, email, refreshToken = null) => {
  try {
    let refresh_token;
    if(refreshToken == null){
      refresh_token = RefreshToken.findOne({email: email})
    } else {
      refresh_token = refreshToken
    }
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

const saveCalendarWithUrl = expressAsyncHandler( async (req, res, next) => {
  const {email, event_id} = req.body

  RefreshToken.findOne(
    {email: email}, 
    (err, refresh_token_data)=>{
      if(err){
        console.log(err)
      } else {
        const refresh_token = refresh_token_data.refreshToken;

        Event.findOne(
          { _id: event_id },
          async (err, data) => {
            if (err) {
              return services.createSendToken({}, 'error', err, res);
            }
            
            let event = {
              'summary': data['event_title'],
              'description': data['event_description'],
              'start': {
                  'dateTime': moment(Date(data['start_date'])).format(),
                  'timeZone': 'Africa/Lagos'
              },
              'end': {
                  'dateTime': moment(Date(data['end_date'])).format(),
                  'timeZone': 'Africa/Lagos'
              },
            }

            console.log(event)
      
            if(insertCalendar(event, email, refresh_token)){
              return services.createSendToken({}, 'success', 'Successful', res);
            } else {
              return services.createSendToken({}, 'error', 'An Error Occured Trying To Add Calendar', res);
            }
          },
        );
      }
    }
  )
})

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
    redirectUri: redirectURI,
  });

  console.log(refresh_token)
  console.log(access_token)
  console.log(id_token)

  const googleUser = await axios
  .get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
        'accept-encoding': '*'
      },
    }
  )
  .then((res) => res.data)
  .catch((error) => {
    console.log(error)
    console.error(`Failed to fetch user`);
    throw new Error(error.message);
  });

  const obj = {
    email: googleUser.email,
    refreshToken: refresh_token
  }

  try{
    await new RefreshToken(obj).save()
    return res.send('Succesfully synced your calendar!')
  } catch(e){
    return res.send('Already synced!')
  }
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
          'accept-encoding': '*'
        },
      });
      console.log('success')
      console.log(res)
    return res.data;
  } catch (error) {
    console.log(error)
    console.error(`Failed to fetch auth tokens`);
    throw new Error(error.message);
  }
}

module.exports = {
  saveEvent,
  getRefreshToken,
  saveCalendarWithUrl,
  sendUserToAuthenticate
};
