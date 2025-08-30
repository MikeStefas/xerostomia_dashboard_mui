'use client';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { BRANDING, NAVIGATION_ADMIN, NAVIGATION_CLINICIAN } from '../misc/appproviderPROPS';
import React, { createContext, useState } from 'react';

//ROLE CONTEXT
type RoleContextType = {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

export const RoleContext = createContext<RoleContextType | null>(null);






//Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const [role, setRole] = useState('');

  


  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body>
        <RoleContext.Provider value={{ role, setRole }}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          
            <NextAppProvider
              navigation={role==='ADMIN'?NAVIGATION_ADMIN:NAVIGATION_CLINICIAN}
              branding={BRANDING}
            >
              {children}
            </NextAppProvider>
            
          </AppRouterCacheProvider>
        </RoleContext.Provider>
      </body>
    </html>
  );
}