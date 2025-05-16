import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as InstagramStrategy } from 'passport-instagram';
import User from '../models/User.js';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ 'oauthProviders.google': profile.id });

        if (!user) {
            // Check if email exists with another provider
            user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
                // Add Google to existing user
                user.oauthProviders.google = profile.id;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    username: profile.displayName.replace(/\s+/g, '').toLowerCase() +
                        Math.floor(Math.random() * 1000),
                    email: profile.emails[0].value,
                    password: 'oauth-provided',
                    passwordConfirm: 'oauth-provided',
                    isEmailVerified: true,
                    oauthProviders: {
                        google: profile.id
                    }
                });
            }
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/v1/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'displayName'],
    scope: ['email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ 'oauthProviders.facebook': profile.id });

        if (!user) {
            // Check if email exists with another provider
            user = await User.findOne({ email: profile.emails?.[0]?.value });

            if (user) {
                // Add Facebook to existing user
                user.oauthProviders.facebook = profile.id;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    username: profile.displayName.replace(/\s+/g, '').toLowerCase() +
                        Math.floor(Math.random() * 1000),
                    email: profile.emails?.[0]?.value,
                    password: 'oauth-provided',
                    passwordConfirm: 'oauth-provided',
                    isEmailVerified: true,
                    oauthProviders: {
                        facebook: profile.id
                    }
                });
            }
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Instagram OAuth Strategy
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/instagram/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ 'oauthProviders.instagram': profile.id });

        if (!user) {
            // Create user with generated credentials since Instagram doesn't provide email
            user = await User.create({
                username: profile.username + Math.floor(Math.random() * 1000),
                email: `${profile.username}@instagram.user`,
                password: 'oauth-provided',
                passwordConfirm: 'oauth-provided',
                isEmailVerified: false,
                oauthProviders: {
                    instagram: profile.id
                }
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Session serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;