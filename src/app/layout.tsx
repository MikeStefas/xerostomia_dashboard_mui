'use client';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { BRANDING, NAVIGATION_ADMIN, NAVIGATION_CLINICIAN } from '../appProvider/appproviderPROPS';
import React, { createContext, useEffect, useState } from 'react';
import AuthGuard from '.././Guards/AuthGuard';
import { getRoleFromCookie } from '@/tokenSessionFuncs/getRoleFromCookie';


//ROLE CONTEXT
type RoleContextType = {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

export const RoleContext = createContext<RoleContextType | null>(null);

//Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [role, setRole] = useState(''); // Decoded from access_token, set on signin

 


  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body>
        <RoleContext.Provider value={{ role, setRole }}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          
            <NextAppProvider
              navigation={role==='ADMIN'?NAVIGATION_ADMIN:NAVIGATION_CLINICIAN}
              branding={BRANDING}
            >
              {/* Unable to access the webapp without being logged in.
              No role == no access_token*/}
              <AuthGuard role={role}>
                {children}
              </AuthGuard>
            </NextAppProvider>
            
          </AppRouterCacheProvider>
        </RoleContext.Provider>
      </body>
    </html>
  );
}