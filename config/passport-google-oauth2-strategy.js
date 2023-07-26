const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto')
const User = require('../models/user');

// Tell passport to use a new strategy for user login
passport.use(new googleStrategy({
    clientID: "854863113356-bh5c88vps2eahev24uefjaliimgc8gbf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    // Find the user
    User.findOne({ email: profile.emails[0].value })
        .then(user => {
            console.log(accessToken, refreshToken);

            //  console.log(profile);
            console.log(profile.photos[0].value);
            if (user) {
                // If found, set this user as req.user
                return done(null, user);
            } else {
                // If not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }).then(user => {
                    return done(null, user);
                }).catch(err => {
                    console.log('Error in creating user', err);
                    return done(err);
                });
            }
        })
        .catch(err => {
            console.log('Error in Google strategy-passport', err);
            return done(err);
        });
}));

module.exports = passport;