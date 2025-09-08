'use server';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants";
import { HandleTokenRefreshIfNeeded } from '@/tokenSessionFuncs/handleTokenRefreshIfNeeded';


export async function ViewPatientsOfClinician(clinicianID:number) {

  await HandleTokenRefreshIfNeeded();
  
  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';

  //fetch data
  const response = await fetch(`${BACKEND_URL}/admin/view-patients-of-clinician`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json", 
          },
  body: JSON.stringify({clinicianID: clinicianID}),
  })


  if (response.ok) {
    const result = await response.json();
    return result;
    
  } else {
    return("Failed to fetch data");
  }
}