import { parseCookies, setCookie, destroyCookie } from "nookies";

//Save the cookie and make it secure
export function saveJWTinCookie(token) {
  setCookie(null, "jwt_token_TDL", token, { secure: true });
}

//Destroy contents of the cookie
export function destroyJWTCookie() {
  destroyCookie({}, "jwt_token_TDL");
}
