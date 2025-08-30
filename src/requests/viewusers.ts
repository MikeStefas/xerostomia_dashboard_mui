'use server';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants";
import { GetRoleFromToken } from '../funcs/getrolefromtoken';

export async function ViewUsers(roleGiven: "USER"| "ANY"| "CLINICIAN") {

  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';
  let roleGuard = GetRoleFromToken(access_token);

  //fetch data
  const response = await fetch(`${BACKEND_URL}/${roleGuard}/view-users`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json", 
          },
  body: JSON.stringify({role: roleGiven })
  })

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    throw new Error('Failed to fetch data');
  }
}