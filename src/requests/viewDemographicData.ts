'use server';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants";
import { HandleTokenRefreshIfNeeded } from '@/tokenSessionFuncs/handleTokenRefreshIfNeeded';


export async function ViewDemographicData(userID:number) {

  await HandleTokenRefreshIfNeeded();
  
  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';


  //fetch data
  const response = await fetch(`${BACKEND_URL}/demographics/view-demographic-data`, {
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