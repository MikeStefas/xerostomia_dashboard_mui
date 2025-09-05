'use server';
import {BACKEND_URL} from "../constants";
import { cookies } from 'next/headers';
import { RefreshTokenRequest } from "./refreshToken";
import { isTokenExpired } from "@/token/session_related_funcs/isTokenExpired";



export async function PairClinician({clinicianID,patientID} : {clinicianID:number,patientID:number}){ {

   let cookieStore =  await cookies();
   let access_token = cookieStore.get('access_token')?.value || '';

   //Refresh
   if(isTokenExpired(access_token)){
     await RefreshTokenRequest();
     cookieStore = await cookies();
     access_token = cookieStore.get('access_token')?.value || '';
     PairClinician({clinicianID,patientID});
   }
    
    
    const response = await fetch(`${BACKEND_URL}/admin/pair-clinician`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}` },
    body: JSON.stringify({patientID:patientID,clinicianID:clinicianID})
  });

  if (response.ok) {
  
    const result = await response.json();
    return result.message;
    } 
  else {
    return("Error creating demographic data");
  }
}
}