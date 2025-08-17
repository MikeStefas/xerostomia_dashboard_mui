'use server';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants";
import { GetRoleFromToken } from '../funcs/getrolefromtoken';

export async function ViewPatients() {

  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';
  let role = GetRoleFromToken(access_token);

  //fetch data
  const response = await fetch(`${BACKEND_URL}/${role}/view-patients`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json", 
          },
  })

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    throw new Error('Failed to fetch data');
  }
}