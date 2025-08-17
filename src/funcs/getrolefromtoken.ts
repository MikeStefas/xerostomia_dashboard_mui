import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../types/tokenpayload";

export function GetRoleFromToken(access_token:string){
    const decoded = jwtDecode<TokenPayload>(access_token);
    return decoded.role;
}