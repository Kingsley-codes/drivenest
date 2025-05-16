import { body, validationResult } from 'express-validator';
import User from '../models/usermodel.js';


export const validateRegister = [
    body('username')
        .trim()
        .escape()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters')
        .custom(async (value) => {
            const user = await User.findOne({ username: value });
            if (user) throw new Error('Username already in use');
        }),

    body('email')
        .trim()
        .normalizeEmail()
        .escape()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await User.findOne({ email: value.toLowerCase() });
            if (user) throw new Error('Email already in use');
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character'),

    body('passwordConfirm')
        .notEmpty().withMessage('Please confirm your password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
];


export const validateLogin = [
    // Email Validation
    body('email')
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),

    // Password Validation (basic check only)
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 1 }).withMessage('Password cannot be empty'),

    // Error Handling
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                errors: errors.array()
            });
        }
        next();
    }
];

export default {
    validateRegister,
    validateLogin
};