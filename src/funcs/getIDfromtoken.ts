import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../types/tokenpayload";

export function GetIDFromToken(access_token:string){
    const decoded = jwtDecode<TokenPayload>(access_token);
    return decoded.sub;
}