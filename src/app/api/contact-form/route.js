import sendEmail from './sendEmail';

const corsHeaders = new Headers({
    'Access-Control-Allow-Origin': 'https://chaitanyavaru.me',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
});

export async function OPTIONS(req) {
    return new Response(null, { headers: corsHeaders });
}

export async function POST(req) {
    const formData = await req.json();
    const { name, email, message } = formData;

    const emailResponse = await sendEmail(name, email, message);

    return new Response(emailResponse.body, {
        status: emailResponse.status,
        headers: corsHeaders,
    });
}
