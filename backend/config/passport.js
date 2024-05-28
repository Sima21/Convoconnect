const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
            // Check if a user with the given email already exists
            user = await User.findOne({ where: { email: profile.emails[0].value } });

            if (user) {
                // Update the existing user with the Google ID
                user.googleId = profile.id;
                await user.save();
            } else {
                // Create a new user
                user = await User.create({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: '' // Set a default value for password
                });
            }
        }
        return done(null, user);
    } catch (err) {
        console.error('Error in Google Strategy:', err);
        return done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
