import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER, // your Gmail address
                pass: process.env.GMAIL_PASS, // app password from Google
            },
        });

        const mailOptions = {
            from: `"Drivenest" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
