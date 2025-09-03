import { jwtDecode } from "jwt-decode";


import { TokenPayload } from "@/types/tokenpayload";

export function isJwtExpired(access_token: string): boolean {
  try {
    const decoded = jwtDecode<TokenPayload>(access_token);
  
    const exp = decoded.exp;

    const currentTime = Math.floor(Date.now() / 1000);
    console.log(exp, currentTime);
    return exp < currentTime; //false
  } catch {
    return true; //true
  }
}