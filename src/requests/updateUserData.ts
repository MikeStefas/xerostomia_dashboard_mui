'use server';
import {BACKEND_URL} from "../constants";
import { cookies } from 'next/headers';
import { RefreshTokenRequest } from "./refreshToken";
import { HandleTokenRefreshIfNeeded } from "@/tokenSessionFuncs/handleTokenRefreshIfNeeded";



export async function UpdateUserDataRequest(formData: User) {

  await HandleTokenRefreshIfNeeded();
  
  let cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';
  

  

  const { createdAt, updatedAt, ...DataSent } = formData;



  const response = await fetch(`${BACKEND_URL}/user/update-user-data`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` },
    body: JSON.stringify(DataSent)
  });


    const result = await response.json();
    
    return result.message;
}
