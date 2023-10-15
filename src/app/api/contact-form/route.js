import sendEmail from './sendEmail';

const allowedOrigin = 'https://chaitanyavaru.me';

async function handleRequest(req) {
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

const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

const combinedHandler = allowCors(handleRequest);

export async function POST(req) {
    return await combinedHandler(req);
}
