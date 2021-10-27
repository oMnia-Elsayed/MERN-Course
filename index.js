const express = require("express");

// for authentication from passport-google-oauth20
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// link GoogleStrategy with clientID keys
const keys = require("./config/keys");

const app = express();

/**
 * new GoogleStrategy() -> create new instance of google-strategy
 * to authenticate my users with google
 * passport.use -> to authenticate in general but don't know how to authenticate
 * users with a very specific provider like google
 * there is a new strategy to use, user can use to authenticate themselves inside application
 * add clinetID and clientSecret to GoogleStrategy
 * Configration google strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // used when user grants permission then redirect to callbackURL and take code from params
      // append this url to localhost:5000
      callbackURL: "/auth/google/callback",
    },
    (accessToken, profile) => {
      console.log(accessToken, profile);
    }
  )
);

/**
 * when routing to '/auth/google', we want to run our flow which
 * manage by passport to authenticate the user who use this route,
 * passport use google strategy which has internally identifier of 'google'
 * passport knows to take 'google' and run the GoogleStrategy up there
 *
 * second argument is optional object contains scope specifies what access
 * we want inside this user profile
 * that we asking Google to give us access to this user's profile info. and email
 * Google knows these strings 'profile', 'email' and others
 */
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google")
);

// process.env.PORT -> if there is an evn variable defined by heroku or use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);