'use server';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants";
import { RefreshTokenRequest } from './refreshToken';
import { isTokenExpired } from '@/token/session_related_funcs/isTokenExpired';


export async function ViewUserDemographicData(userID:number) {
  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';

  //Refresh
  if(isTokenExpired(access_token)){
    await RefreshTokenRequest();
    const cookieStore = await cookies();
    access_token = cookieStore.get('access_token')?.value || '';
    ViewUserDemographicData(userID);
  }

  //fetch data
  const response = await fetch(`${BACKEND_URL}/admin/view-user-data`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json", 
          },
  body: JSON.stringify({userID:userID}),
  })


  if (response.ok) {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      const result = JSON.parse(text);
      return result;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return("Invalid JSON in response");
    }
  } else {
    return("Failed to fetch data");
  }
}