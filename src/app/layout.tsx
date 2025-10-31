"use client";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
  BRANDING,
  NAVIGATION_ADMIN,
  NAVIGATION_CLINICIAN,
} from "../appProvider/appproviderPROPS";
import React, { Suspense, useEffect, useState } from "react";
import AuthGuard from ".././Guards/AuthGuard";
import { getRoleFromCookie } from "@/tokenSessionFuncs/getRoleFromCookie";
import CircularProgress from "@mui/material/CircularProgress";

//Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState("");
  useEffect(() => {
    const manageRole = async () => {
      const role = await getRoleFromCookie();
      setRole(role);
    };
    manageRole();
  });

  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body>
        <Suspense
          fallback={
            <div>
              <CircularProgress />
            </div>
          }
        >
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              navigation={
                role === "ADMIN" ? NAVIGATION_ADMIN : NAVIGATION_CLINICIAN
              }
              branding={BRANDING}
            >
              {/* Unable to access the webapp without being logged in.
              No role == no access_token*/}

              <AuthGuard role={role}>{children}</AuthGuard>
            </NextAppProvider>
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
