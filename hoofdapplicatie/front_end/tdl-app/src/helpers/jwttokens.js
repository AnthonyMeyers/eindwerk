import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies'


export function saveJWTinCookie(token)
{
  setCookie(null, 'jwt_token_TDL',token)
  
}

export function destroyJWTCookie()
{
  destroyCookie(null, 'jwt_token_TDL');
}