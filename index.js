const express = require('express');

// for authentication from passport-google-oauth20
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

/**
 * new GoogleStrategy() -> create new instance of google-strategy
 * to authenticate my users with google
 * passport.use -> to authenticate in general but don't know how to authenticate
 * users with a very specific provider like google
 * there is a new strategy to use, user can use to authenticate themselves inside application
 */
passport.use(new GoogleStrategy());

// process.env.PORT -> if there is an evn variable defined by heroku or use 5000
const PORT = process.env.PORT || 5000; 

app.listen(PORT);