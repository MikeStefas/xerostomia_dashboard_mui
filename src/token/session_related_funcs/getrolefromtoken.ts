import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../../types/tokenpayload";

export function GetRoleFromToken(access_token:string){
    try{
        const decoded = jwtDecode<TokenPayload>(access_token);
        return decoded.role;
    } 
    catch {
        return 'EXPIRED TOKEN. CAN NOT GET ROLE';
    }
}