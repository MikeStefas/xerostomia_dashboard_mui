'use server';

import { redirect } from "next/navigation";
import {BACKEND_URL} from "@/constants";
import { SignupFormSchema } from "../types/credentialtypes";
import { cookies } from "next/headers";
import { RefreshTokenRequest } from "./refreshToken";
import { HandleTokenRefreshIfNeeded } from "@/tokenSessionFuncs/handleTokenRefreshIfNeeded";




export async function createUser(email:string, password:string, firstName:string ,lastName:string) {

  await HandleTokenRefreshIfNeeded();
  
  const cookieStore = await cookies();
  let access_token = cookieStore.get('access_token')?.value || '';


  const data = { email : email, password: password, firstName: firstName, lastName: lastName };

  //validate the email and password 
  const validationFields = SignupFormSchema.safeParse(data);

  if (!validationFields.success) {
    return 'The password must be 8+ letters and have 1+ numbers.\nThe email should have the schema of an email.\nFirst and Last Name must not be empty.'
  }

  //request to signin
  const response = await fetch(`${BACKEND_URL}/auth/create-user`, {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json",},
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return result.message;
  }
  else {
    return("failed");
}}
