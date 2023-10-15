import sendEmail from './sendEmail';

const allowedOrigin = 'https://chaitanyavaru.me';

export async function POST(req) {
    const origin = req.headers.get('Origin');
    if (origin !== allowedOrigin) {
        return new Response('Invalid origin', { status: 403 });
    }

    const formData = await req.json();
    const { name, email, message } = formData;

    const emailResponse = await sendEmail(name, email, message);

    return new Response(emailResponse.body, {
        status: emailResponse.status,
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
