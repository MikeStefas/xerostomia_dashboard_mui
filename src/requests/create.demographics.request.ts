'use server';
import {BACKEND_URL} from "../constants";
import { cookies } from 'next/headers';



export async function CreateDemographicsRequest(formData: any) {

  let cookieStore =  await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';

  
  // finaly fount the problem( it was a string)
  formData.yearOfBirth = Number(formData?.yearOfBirth)


    console.log(formData)
  const response = await fetch(`${BACKEND_URL}/admin/create-demographics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}` },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
  
    const result = await response.json();

    return result.message;
    } 
  else {
    return("Error creating demographic data");
  }
}
