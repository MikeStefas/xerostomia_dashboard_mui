'use server';
import {BACKEND_URL} from "../constants";
import { cookies } from 'next/headers';
import  { jwtDecode }  from "jwt-decode";
import { TokenPayload } from "../types/tokenpayload";
import { RefreshTokenRequest } from "./refreshToken";
import { isTokenExpired } from "@/token/session_related_funcs/isTokenExpired";



export async function UpdateUserRequest(formData: User) {

  let cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';
  

  //Refresh
  if(isTokenExpired(access_token)){
    await RefreshTokenRequest();
    cookieStore = await cookies();
    access_token = cookieStore.get('access_token')?.value || '';
    UpdateUserRequest(formData);
  }

  const { createdAt, updatedAt, ...DataSent } = formData;



  const response = await fetch(`${BACKEND_URL}/admin/update-user`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` },
    body: JSON.stringify(DataSent)
  });

  if (response.ok) {
  
    const result = await response.json();
    
    
    return result.message;
    } 
  else {
    return("Error updating user");
  }
}
