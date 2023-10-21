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
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td>
                <p style="font-size: 16px; line-height: 0.6;">You got a new message from &nbsp; <span style="font-size: 18px; font-weight: bold;">${name}</span></p>
                <br>
                <h5 style="font-size: 20px; font-weight: bold; margin: 0px 0px 10px; line-height: 0.6;">Message:</h5>
                <p style="font-size: 16px; margin: 0px; line-height: 0.6;">${message}</p> 
                <br>
                <p style="line-height: 0.6;"> <span style="font-size: 20px; font-weight: bold; margin: 0px;">Email: &nbsp;</span><span style="font-size: 16px; margin: 0px;">${email}</span>  </p>
                </td>
            </tr>
        </table>`,
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
