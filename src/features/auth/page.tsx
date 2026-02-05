"use client";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  SignInPage as ToolpadSignInPage,
  type AuthProvider,
} from "@toolpad/core/SignInPage";
import { signInTheme } from "@/themes/signintheme";
import { useSignIn } from "./hooks/useSignIn";

export default function SignInPage() {
  const { handleSignIn } = useSignIn();

  const providers: AuthProvider[] = [
    { id: "credentials", name: "Email and password" },
  ];

  return (
    <AppProvider theme={signInTheme}>
      <ToolpadSignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
