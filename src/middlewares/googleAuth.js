const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const dotenv = require('dotenv');
const { User } = require('../models');
const { generateJWTToken } = require('../services/auth');
const expressAsyncHandler = require('express-async-handler');
dotenv.config();

GOOGLE_AUTH_OPTIONS = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.SERVER_ROOT_URI,
  //  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
}

const verifyCallback = async(request, accessToken, refreshToken, profile, done)=>{
  const name = `${profile.name.givenName} ${profile.name.familyName}`;
  const email = profile.email;
  let payload;
  // let payload;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    const userData = { name, email };
    const user = await new User(userData).save();
    //const user = await User.findOne({ email });
    payload = {
      id: user._id,
      name,
      email,
    };
  } else {
    payload = {
      id: userExists._id,
      name,
      email,
    };
  }
  return done(null, payload);
}

passport.use(
  new GoogleStrategy(
    GOOGLE_AUTH_OPTIONS,
    verifyCallback
  )
);



passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  done(null, user);
});
