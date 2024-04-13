import sendEmail from './sendEmail'

const allowedOrigins = ['https://hokagecv.github.io', 'https://chaitanyavaru.me']

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': '*',
  }
}

function checkOrigin(req) {
  const origin = req.headers.get('Origin')
  const foundOrigin = allowedOrigins.find((allowedOrigin) => allowedOrigin.includes(origin))

  return foundOrigin ? foundOrigin : allowedOrigins[0]
}

export async function OPTIONS(req) {
  const allowedOrigin = checkOrigin(req)
  return new Response(null, { headers: corsHeaders(allowedOrigin) })
}

export async function POST(req) {
  const allowedOrigin = checkOrigin(req)
  const formData = await req.json()
  const { name, email, message } = formData

  const emailResponse = await sendEmail(name, email, message)

  return new Response(emailResponse.body, {
    status: emailResponse.status,
    headers: corsHeaders(allowedOrigin),
  })
}
