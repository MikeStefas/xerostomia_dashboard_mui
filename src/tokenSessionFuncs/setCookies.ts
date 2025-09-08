'use server';
import { cookies } from "next/headers";

export async function setCookies(access_token: string, refresh_token: string) {
    let cookieStore = await cookies();
    //Make cookie for the accesstoken
    cookieStore.set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 1, // 15 mins
      });

    //make cookie for refreshtoken
    cookieStore.set('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 7, // 7 hours
      });
}