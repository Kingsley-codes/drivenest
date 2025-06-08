export const getVerificationSentTemplate = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification Sent</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 40px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { color: #333; }
          p { color: #666; font-size: 18px; }
          .icon { font-size: 60px; color: #4CAF50; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">✉️</div>
          <h1>Check Your Email</h1>
          <p>We've sent a verification link to your email address. Please click the link to complete your registration.</p>
          <p>If you don't see the email, please check your spam folder.</p>
        </div>
      </body>
      </html>
    `;
};

export const getVerificationSuccessTemplate = (redirectUrl) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 40px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { color: #4CAF50; }
          p { color: #666; font-size: 18px; }
          .icon { font-size: 60px; color: #4CAF50; margin-bottom: 20px; }
          .redirect-notice { margin-top: 30px; font-style: italic; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">✓</div>
          <h1>Email Verified Successfully!</h1>
          <p>Your email address has been confirmed. You're now being redirected back to where you were.</p>
          <p class="redirect-notice">If you're not redirected automatically, <a href="${redirectUrl}">click here</a>.</p>
        </div>
        <script>
          setTimeout(() => {
            window.location.href = "${redirectUrl}";
          }, 3000);
        </script>
      </body>
      </html>
    `;
};