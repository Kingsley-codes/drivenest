import express from 'express';
import authController from '../controllers/authController.js';
import validateRegister from '../middlewares/validation.js';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import csrf from 'csurf';
import { validateLogin } from '../middlewares/validation.js';


const router = express.Router();

// Rate limiting
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many accounts created from this IP, please try again after 15 minutes'
});

// CSRF protection
const csrfProtection = csrf({ cookie: true });

// Routes
router.post(
    '/register',
    csrfProtection,
    registerLimiter,
    validation.validateRegister,
    authController.register
);

router.get('/verify-email/:token', authController.verifyEmail);

// OAuth routes
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthCallback);

router.get('/auth/facebook', authController.facebookAuth);
router.get('/auth/facebook/callback', authController.facebookAuthCallback);

router.get('/auth/instagram', authController.instagramAuth);
router.get('/auth/instagram/callback', authController.instagramAuthCallback);

export default router;