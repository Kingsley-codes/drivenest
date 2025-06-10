import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/userModel.js';


const configurePassportStrategies = () => {
    // Google Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
        passReqToCallback: true, // Add this to access req in callback
        scope: ['profile', 'email'],
        proxy: true // ✅ for correct redirect behind proxies like Vercel/Next
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ 'oauthProviders.google': profile.id });

            if (!user) {
                user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    user.oauthProviders.google = profile.id;
                    await user.save();
                } else {
                    user = await User.create({
                        username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
                        email: profile.emails[0].value,
                        isEmailVerified: true,
                        oauthProviders: { google: profile.id }
                    });
                }
            }

            // Store redirect path from cookie in user object
            user.redirectPath = req.cookies.oauth_redirect || '/';
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }));

    // Facebook Strategy (similar pattern)
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'name', 'displayName'],
        scope: ['email']
    }, async (req, accessToken, refreshToken, profile, done) => {
        // Similar implementation as Google
        // ...
        user.redirectPath = req.cookies.oauth_redirect || '/';
        return done(null, user);
    }));

    // Serialization/Deserialization
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

export { configurePassportStrategies };