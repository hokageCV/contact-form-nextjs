import nodemailer from 'nodemailer';

const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_LOGIN_NAME,
        pass: process.env.SMTP_PASSWORD,
    },
};

async function sendEmail(name, email, message) {
    const transporter = nodemailer.createTransport(smtpConfig);

    const emailContent = {
        from: email,
        to: process.env.RECIPIENT_MAIL,
        subject: 'चिट्ठी आई है',

        text: `
        You got a new message from ${name} 
        \n\n\n Message: ${message}  \n\n\n
        Email: ${email}\n
        `,
    };

    try {
        await transporter.sendMail(emailContent);

        return {
            status: 200,
            body: 'Email sent successfully',
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            body: 'Error sending email',
        };
    }
}

export default sendEmail;
