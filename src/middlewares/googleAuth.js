const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const dotenv = require('dotenv');
const { User } = require('../models');
const { generateJWTToken } = require('../services/auth');
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.SERVER_ROOT_URI,
      //  callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const name = `${profile.name.givenName} ${profile.name.familyName}`;
      const email = profile.email;
      let payload;
      console.log(name, email);
      console.log(profile);
      // let payload;
      const userExists = await User.findOne({ email });
      if (!userExists) {
        const userData = { name, email };
        const user = await new User(userData).save();
        //const user = await User.findOne({ email });
        console.log(user);
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
        console.log('hello there');
      }


      return done(null, payload);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
