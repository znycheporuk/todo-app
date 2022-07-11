import { createCookieSessionStorage } from '@remix-run/node'


const sessionSecret = process.env.SESSION_SECRET ?? 'secret'

export const {getSession, commitSession} = createCookieSessionStorage({
  cookie: {
    name: 'session',
    secure: process.env['NODE_ENV'] === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})


export const getUserSession = (request: Request) => {
  return getSession(request.headers.get('Cookie'))
}
