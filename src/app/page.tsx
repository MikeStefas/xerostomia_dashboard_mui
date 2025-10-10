'use client';
import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { SignInRequest } from '@/requests/signinrequest';
import { useRouter } from 'next/navigation';
import { signInTheme } from '@/themes/signintheme';
import { RoleContext } from './layout';
import { setCookies } from '@/tokenSessionFuncs/setCookies';
import { GetRoleFromToken } from '@/tokenSessionFuncs/getrolefromtoken';

/*
  THIS IS THE SIGNIN PAGE
*/


export default function NotificationsSignInPageError() {
  const router = useRouter();

  const context = React.useContext(RoleContext);
  if (!context) {
    throw new Error("Error role context not found");
  }
  const { setRole } = context;
  

  const providers: AuthProvider[] = [{ id: 'credentials', name: 'Email and password' }];

  const signIn: (
    provider: AuthProvider,
    formData?: FormData,
  ) => Promise<AuthResponse> = async (provider, formData) => {
    return new Promise<AuthResponse>((resolve) => {
      setTimeout(async () => {
        const email = String(formData?.get('email') || '');
        const password = String(formData?.get('password') || '');

    
        try {
          let res = await SignInRequest(email, password); //send request

          if(typeof res !== 'string'){                  //responce is valid (object with tokens)
            let access_token = res["access_token"];
            let refresh_token = res["refresh_token"];

            let role = await GetRoleFromToken(access_token);
            await setRole(role);                          //set role  
            
            await setCookies(access_token, refresh_token); //set cookies
            router.push('/Home');
            }
          
          if (res === 'You are not a clinician') {       //Response when USER is found
            resolve({ type: 'CredentialsSignin', error: 'You are not a clinician' });
          }
          if (res === 'Wrong credentials') {       
            resolve({ type: 'CredentialsSignin', error: 'Wrong credentials' });
          } 
        } catch (error) {
          resolve({ type: 'CredentialsSignin', error: 'Something went wrong' });
        }
      }, 300);
    });
  };

  return (
    <AppProvider theme={signInTheme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
      
    </AppProvider>
  );
}
