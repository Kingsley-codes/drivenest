import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/userModel.js';


const getCallbackURL = () => {
    if (process.env.NODE_ENV === 'production') {
        return `${process.env.SERVER_URL}/api/auth/google/callback`;
    }
    return 'http://localhost:3000/api/auth/google/callback';
};

const configurePassportStrategies = () => {
    // Google Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: getCallbackURL(),
        scope: ['profile', 'email'],
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                // Add redirect path as temporary property
                const userWithRedirect = {
                    ...user.toObject(),
                    _redirectPath: req.cookies.oauth_redirect || '/'
                };
                return done(null, userWithRedirect);
            }

            user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
                user.googleId = profile.id;
                await user.save();

                const userWithRedirect = {
                    ...user.toObject(),
                    _redirectPath: req.cookies.oauth_redirect || '/'
                };
                return done(null, userWithRedirect);
            }


            const newUser = await User.create({
                username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
                email: profile.emails[0].value,
                isEmailVerified: true,
                googleId: profile.id,
            });

            // Add redirect path as a temporary property
            const userWithRedirect = {
                ...newUser.toObject(),
                _redirectPath: req.cookies.oauth_redirect || '/'
            };

            return done(null, userWithRedirect);
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