import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sendEmail from '../utils/email.js';
import passport from 'passport';

// Utility functions
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: 'strict'
    });

    // Remove sensitive data
    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

// Password and token related methods
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
};

const correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const createEmailVerificationToken = (user) => {
    const verificationToken = crypto.randomBytes(32).toString('hex');

    user.emailVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

    return verificationToken;
};

// Auth controllers
export const registerUser = async (req, res, next) => {
    try {
        req.body.email = req.body.email.toLowerCase();

        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: existingUser.email === req.body.email
                    ? 'Email already in use'
                    : 'Username already taken'
            });
        }

        // Hash password before user creation
        req.body.password = await hashPassword(req.body.password);
        req.body.passwordConfirm = undefined;

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // Email verification
        const verificationToken = createEmailVerificationToken(newUser);
        await newUser.save({ validateBeforeSave: false });

        const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${verificationToken}`;

        await sendEmail({
            email: newUser.email,
            subject: 'Verify your email address',
            html: `
        <h1>Welcome!</h1>
        <p>Please verify your email:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>Link expires in 24 hours.</p>
      `
        });

        createSendToken(newUser, 201, req, res);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Token is invalid or has expired'
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Email verified successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// OAuth controllers
export const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }, (err, user) => {
        if (err) return next(err);
        createSendToken(user, 200, req, res);
    })(req, res, next);
};

export const facebookAuth = passport.authenticate('facebook', {
    scope: ['email']
});

export const facebookAuthCallback = (req, res, next) => {
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        session: false
    }, (err, user) => {
        if (err) return next(err);
        createSendToken(user, 200, req, res);
    })(req, res, next);
};

export const instagramAuth = passport.authenticate('instagram');

export const instagramAuthCallback = (req, res, next) => {
    passport.authenticate('instagram', {
        failureRedirect: '/login',
        session: false
    }, (err, user) => {
        if (err) return next(err);
        createSendToken(user, 200, req, res);
    })(req, res, next);
};

// Login controller
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        // 2) Check if user exists and password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        // 3) If everything ok, send token
        createSendToken(user, 200, req, res);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

export default {
    registerUser,
    verifyEmail,
    googleAuth,
    googleAuthCallback,
    facebookAuth,
    facebookAuthCallback,
    instagramAuth,
    instagramAuthCallback,
    loginUser
};