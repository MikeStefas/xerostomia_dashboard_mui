'use server';
import {BACKEND_URL} from "../constants";
import  { jwtDecode }  from "jwt-decode";
import { SigninFormSchema } from "../types/credentialtypes";
import { TokenPayload } from "../types/tokenpayload";

//returns true if successful or "You are not a clinician", "Wrong credentials"
export async function SignInRequest(email: string, password:string) {


  const data = { email : email, password: password };

  //validate the email and password 
  const validationFields = SigninFormSchema.safeParse(data);

  if (!validationFields.success) {
    return 'The password must be 8+ letters.\nThe email should have the schema of an email.'
  }

  //request to signin
  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
  
    const result = await response.json();

    //decode the token and check the role
    const decoded = await jwtDecode<TokenPayload>(result["access_token"]);

    //only block USERS. CLINICIAN/ADMIN can signin
    if(decoded.role === "USER") {
      return ('You are not a clinician');
    }
    
    return {access_token: result["access_token"], 
            refresh_token: result["refresh_token"]};
     }
  else {
    return("Wrong credentials");
  }
}
