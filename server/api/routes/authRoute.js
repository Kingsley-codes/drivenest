import express from 'express';
import authController from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middlewares/validation.js';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import csrf from 'csurf';


const router = express.Router();

// Rate limiting
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many accounts created from this IP, please try again after 15 minutes'
});

// CSRF protection
const csrfProtection = csrf({ cookie: true });

// CSRF Token Endpoint
router.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// User Registration
router.post(
    '/register',
    csrfProtection,
    registerLimiter,
    validateRegister,
    authController.registerUser
);

// Email Verification
router.get('/verify-email/:token', authController.verifyEmail);

// Login
router.post('/login', validateLogin, authController.loginUser);


// Google OAuth
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleAuthCallback
);

// Facebook OAuth
router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    authController.facebookAuthCallback
);

export default router;