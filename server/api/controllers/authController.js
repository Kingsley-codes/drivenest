import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { sendEmail } from '../utils/email.js';
import passport from 'passport';
import { getVerificationEmailTemplate } from '../templates/verificationEmail.js';

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

        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'Passwords do not match'
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

        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/email-verified/${verificationToken}`;

        await sendEmail({
            to: newUser.email,
            subject: 'Verify your email address',
            html: getVerificationEmailTemplate(verificationUrl)

        });

        // Respond without logging in the user (require email verification first)
        res.status(201).json({
            status: 'success',
            message: 'Registration successful! Please check your email to verify your account.',
            data: {
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    username: newUser.username
                }
            }
        });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during registration. Please try again.'
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

        res.redirect(`/email-verified?status=success&userId=${user._id}`);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// OAuth callback controllers

export const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }, (err, user) => {
        if (err) return next(err);
        createSendToken(user, 200, req, res);
    })(req, res, next);
};


export const facebookAuthCallback = (req, res, next) => {
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        session: false
    }, (err, user) => {
        if (err) return next(err);
        createSendToken(user, 200, req, res);
    })(req, res, next);
};


// Add this to your authController.js
export const checkAuth = async (req, res) => {
    try {
        // 1) Get token from cookie
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return res.status(200).json({
                authenticated: false,
                message: 'Not authenticated'
            });
        }

        // 2) Verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(200).json({
                authenticated: false,
                message: 'User no longer exists'
            });
        }

        // 4) Check if user changed password after token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return res.status(200).json({
                authenticated: false,
                message: 'Password changed, please log in again'
            });
        }

        // If we get here, user is authenticated
        res.status(200).json({
            authenticated: true,
            user: {
                id: currentUser._id,
                username: currentUser.username,
                email: currentUser.email
            }
        });
    } catch (err) {
        res.status(200).json({
            authenticated: false,
            message: 'Invalid token'
        });
    }
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

// Logout controller
export const logoutUser = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000), // 10 seconds
        httpOnly: true
    });

    res.status(200).json({ status: 'success' });
};

export default {
    registerUser,
    verifyEmail,
    googleAuthCallback,
    facebookAuthCallback,
    loginUser,
    checkAuth,
    logoutUser
};