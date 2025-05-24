import express from 'express';
import authController from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middlewares/validation.js';
import rateLimit from 'express-rate-limit';
import passport from 'passport';


const authRouter = express.Router();

// Rate limiting
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many accounts created from this IP, please try again after 15 minutes'
});



// User Registration
authRouter.post(
    '/register',
    registerLimiter,
    validateRegister,
    authController.registerUser
);

// Email Verification
authRouter.get('/email-verified/:token', authController.verifyEmail);

// Login
authRouter.post('/login', validateLogin, authController.loginUser);

//Logout
authRouter.post('/auth/logout', authController.logoutUser);

// token authentication
authRouter.get('/check', authController.checkAuth);

// Google OAuth
authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleAuthCallback
);

// Facebook OAuth
authRouter.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

authRouter.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    authController.facebookAuthCallback
);

export default authRouter;