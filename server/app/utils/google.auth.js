const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

// Use your database instead in real apps
const users = [];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      let user = users.find((u) => u.email === email);
      if (!user) {
        user = {
          id: profile.id,
          name: profile.displayName,
          email,
        };
        users.push(user);
      }
      return done(null, user);
    }
  )
);
