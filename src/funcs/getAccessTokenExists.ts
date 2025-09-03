'use server';
import { cookies } from "next/headers";

export async function getAccessTokenExists() {

  let cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';
  if (!access_token) return false;
  return true;
}