export const emailLayout = (content) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://yourdomain.com/logo.png" alt="Company Logo" style="max-height: 50px;">
    </div>
    ${content}
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      © ${new Date().getFullYear()} Your Company. All rights reserved.
    </div>
  </div>
`;