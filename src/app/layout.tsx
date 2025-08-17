import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { BRANDING, NAVIGATION } from '../misc/appproviderPROPS';
import React from 'react';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
            >
              {children}
            </NextAppProvider>
            
          </AppRouterCacheProvider>
      </body>
    </html>
  );
}