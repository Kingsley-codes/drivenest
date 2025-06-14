import { emailLayout } from './layout.js';

export const getVerificationEmailTemplate = (verificationUrl) => emailLayout(`
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif;  border-radius: 8px;">
  <h1 style="color: #f59e0b; font-size: 24px; margin-bottom: 20px;">Welcome to DriveNest!</h1>
  <p style="font-size: 16px; line-height: 1.5; color: #fcd34d; margin-bottom: 25px;">
    Thank you for registering. Please verify your email address to complete your account setup.
  </p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="${verificationUrl}" 
       style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #fcd34d; 
              text-decoration: none; border-radius: 4px; font-weight: bold;">
      Verify Email Address
    </a>
  </div>
  <p style="font-size: 14px; color: #fcd34d; margin-top: 20px; line-height: 1.5;">
    If the button doesn't work, you can also verify your email by clicking on the link below:
  </p>
  <p style="font-size: 14px; color: #fcd34d; margin-top: 10px;">
    <a href="${verificationUrl}" style="color: #2563eb; text-decoration: underline;">${verificationUrl}</a>
  </p>
  <p style="font-size: 14px; color: #fcd34d; margin-top: 20px; line-height: 1.5;">
    This link will expire in 24 hours. If you didn't request this, please ignore this email.
  </p>
  </div>
`);