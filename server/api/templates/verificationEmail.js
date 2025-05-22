import { emailLayout } from './layout.js';

export const getVerificationEmailTemplate = (verificationUrl) => emailLayout(`
  <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 20px;">Welcome to Our App!</h1>
  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
    Thank you for registering. Please verify your email address to complete your account setup.
  </p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${verificationUrl}" 
       style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; 
              text-decoration: none; border-radius: 4px; font-weight: bold;">
      Verify Email Address
    </a>
  </div>
  <p style="font-size: 14px; color: #6b7280; margin-top: 20px; line-height: 1.5;">
    This link will expire in 24 hours. If you didn't request this, please ignore this email.
  </p>
`);