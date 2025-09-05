'use server';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants";
import { GetRoleFromToken } from '../token/session_related_funcs/getrolefromtoken';
import { RefreshTokenRequest } from './refreshToken';
import { isTokenExpired } from '@/token/session_related_funcs/isTokenExpired';

export async function ViewUserReports(userID:number) {
  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';
  let roleGuard = GetRoleFromToken(access_token);
  
  //Refresh
  if(isTokenExpired(access_token)){
    await RefreshTokenRequest();
    const cookieStore = await cookies();
    access_token = cookieStore.get('access_token')?.value || '';
    roleGuard = GetRoleFromToken(access_token);
  }

  //fetch data
  const response = await fetch(`${BACKEND_URL}/${roleGuard}/view-user-reports`, {
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
    return result;
  } else {
    return 'Failed to fetch data';
  }
}