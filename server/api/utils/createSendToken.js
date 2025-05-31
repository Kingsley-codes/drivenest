import jwt from 'jsonwebtoken';

// Utility functions
const signToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: false, // req.secure || req.headers['x-forwarded-proto'] === 'https'. this should be true in production
        // If using HTTPS, set secure to true
        sameSite: 'lax',
        path: '/' // Ensure this is set to root
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