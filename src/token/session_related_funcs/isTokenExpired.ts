import { jwtDecode } from "jwt-decode";


export function isTokenExpired(access_token: string) {
  try {
    const decoded: { exp?: number } = jwtDecode(access_token);
    if (!decoded.exp) return false; // no exp claim, assume not expired

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return decoded.exp < now;
  } catch {
    // token malformed
    console.log("token malformed");
    return true;
  }
}
