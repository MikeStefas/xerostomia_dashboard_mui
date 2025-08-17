'use server';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants";
import { GetRoleFromToken } from '../funcs/getrolefromtoken';

export async function ViewUserReports(userID:number) {
  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';
  let role = GetRoleFromToken(access_token);
  

  //fetch data
  const response = await fetch(`${BACKEND_URL}/${role}/view-user-reports`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json", 
          },
  body: JSON.stringify({userID:userID})
  })

  if (response.ok) {
    const result = await response.json();
    if (result.length === 0) {
      return [];
    }
    console.log(result);
    return result;
  } else {
    return 'Failed to fetch data';
  }
}