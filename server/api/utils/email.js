import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async ({ to, subject, html }) => {
    try {

        console.log('Attempting to send email to:', to);
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev', // Dev sender
            to,
            subject,
            html,
        });

        if (response.error) {
            console.error('Resend Error:', response.error);
            throw new Error(response.error.message);
        }

        return response.error;

    } catch (error) {
        console.error('Email Sending Failed:', error);
        throw new Error('Failed to send email');
    }
};
