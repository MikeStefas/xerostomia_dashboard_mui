'use server';
import {BACKEND_URL} from "../constants";
import { cookies } from 'next/headers';
import { HandleTokenRefreshIfNeeded } from "@/tokenSessionFuncs/handleTokenRefreshIfNeeded";



export async function CreateDemographicDataRequest(formData: DemographicData, currentUserID: number) {
  
  await HandleTokenRefreshIfNeeded();
  
  let cookieStore =  await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';

  
  // finaly fount the problem( it was a string)
  formData.yearOfBirth = Number(formData?.yearOfBirth)


    const payload = { ...formData, userID: currentUserID ?? 0 };
    
    console.log(payload);

    const response = await fetch(`${BACKEND_URL}/demographics/create-demographic-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}` },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
  
    const result = await response.json();

    return result.message;
    } 
  else {
    return("Error creating demographic data");
  }
}
