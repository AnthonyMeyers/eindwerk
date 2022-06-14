import { parseCookies, setCookie, destroyCookie } from 'nookies'


export function saveJWTinCookie(token)
{
  const cookies = parseCookies();

  setCookie(null, 'jwt_token', token)
}