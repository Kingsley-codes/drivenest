import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { sendEmail } from '../utils/email.js';
import passport from 'passport';
import { getVerificationEmailTemplate } from '../templates/verificationEmail.js';
import { createSendToken } from '../utils/createSendToken.js';
import { getVerificationSentTemplate, getVerificationSuccessTemplate } from '../templates/verificationPages.js';



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

// Add these new controllers
export const showVerificationSentPage = (req, res) => {
    res.send(getVerificationSentTemplate());
};

export const showVerificationSuccessPage = (req, res) => {
    const redirectUrl = req.query.redirect || '/';
    res.send(getVerificationSuccessTemplate(redirectUrl));
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

        // Create new user
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // Email verification
        const verificationToken = createEmailVerificationToken(newUser);
        await newUser.save({ validateBeforeSave: false });

        // Get redirect path from cookie or use default
        const redirectPath = req.cookies.preRegisterPath || "/";

        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/email-verified/${verificationToken}?redirect=${encodeURIComponent(redirectPath)}`;

        await sendEmail({
            to: newUser.email,
            subject: 'Verify your email address',
            html: getVerificationEmailTemplate(verificationUrl)

        });

        // Clear the redirect cookie after using it
        res.cookie('preRegisterPath', '', { expires: new Date(0) });

        // Respond without logging in the user (require email verification first)
        res.status(201).json({
            status: 'success',
            message: 'Registration successful! Please check your email to verify your account.',
            data: {
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    username: newUser.username
                },
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
            return res.status(400).json(`
        <h1>Verification Failed</h1>
        <p>The verification link is invalid or has expired.</p>
      `);
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        // Get redirect path from query parameter
        const redirectPath = req.query.redirect || "/";

        res.redirect(`/api/auth/verification-success?redirect=${encodeURIComponent(redirectPath)}`);
    } catch (err) {
        res.status(500).json(`
      <h1>Error</h1>
      <p>An error occurred during verification.</p>
    `);
    }
};


// OAuth 

export const handleGoogleLogin = (req, res, next) => {
    // Store redirect path before redirecting to Google
    res.cookie('oauth_redirect', req.query.redirect || '/', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
    });

    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    })(req, res, next);
};


// callback controllers

export const googleAuthCallback = (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.redirect("/login");

        createSendToken(user, 200, req, res); // Set cookie (JWT)

        // Redirect to original path stored in user.redirectPath
        const redirectPath = user.redirectPath || "/";
        res.clearCookie("oauth_redirect", { path: "/" });
        res.redirect(redirectPath);
    })(req, res, next);
};


export const facebookAuthCallback = (req, res, next) => {
    passport.authenticate("facebook", { session: false }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.redirect("/login");

        createSendToken(user, 200, req, res);

        const redirectPath = user.redirectPath || "/";
        res.clearCookie("oauth_redirect", { path: "/" });
        res.redirect(redirectPath);
    })(req, res, next);
};


// Check if user is authenticated
export const checkAuth = async (req, res) => {

    try {
        // Check JWT from cookies
        const token = req.cookies.jwt;

        if (!token || token === 'loggedout') {
            return res.status(200).json({
                status: 'success',
                user: null
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get fresh user from database
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return res.status(200).json({
                status: 'success',
                user: null
            });
        }

        res.status(200).json({
            status: 'success',
            user: {
                id: currentUser._id,
                username: currentUser.username,
                email: currentUser.email
            }
        });
    } catch (err) {
        res.status(200).json({
            status: 'success',
            user: null
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

        // Use the helper function to create token and set cookie
        createSendToken(user, 200, req, res);

    } catch (err) {
        console.error('Login error:', err);
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
    handleGoogleLogin,
    googleAuthCallback,
    facebookAuthCallback,
    showVerificationSentPage,
    showVerificationSuccessPage,
    loginUser,
    checkAuth,
    logoutUser
};