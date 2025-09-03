
//BEFORE EACH REQUEST CHECK IF THE TOKEN IS EXPIRED
//IF IT IS EXPIRED, REFRESH THE TOKEN AND SAVE IT
import { BACKEND_URL } from "@/constants";
import { isJwtExpired } from "@/funcs/isJwtExpired";
import { cookies } from "next/headers";

export async function RefreshToken() {
    let cookieStore = await cookies();
    let access_token = cookieStore.get('access_token')?.value || '';
    let expired = isJwtExpired(access_token);
    console.log(expired);
    if (expired) {
        console.log("TOKEN IS EXPIRED");
        let refresh_token = cookieStore.get('refresh_token')?.value || '';
        let new_refresh_token = await RefreshTokenRequest(refresh_token);
        console.log(new_refresh_token+ " THIS IS THE NEW REFRESH TOKEN");
        return new_refresh_token;
    }
}

async function RefreshTokenRequest(refresh_token: string) {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${refresh_token}` },
      });
    
      if (response.ok) {
      
        const result = await response.json();
        return(result.access_token);
    }
}