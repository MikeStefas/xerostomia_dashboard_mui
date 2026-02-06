"use client";
import { AuthProvider, AuthResponse } from "@toolpad/core";
import { SignInRequest } from "../api/sign-in-request-and-set-cookies";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
    const router = useRouter();

    const handleSignIn: (
        provider: AuthProvider,
        formData?: FormData
      ) => Promise<AuthResponse> = async (provider, formData) => {
        return new Promise<AuthResponse>((resolve) => {
          setTimeout(async () => {
            const email = String(formData?.get("email") || "");
            const password = String(formData?.get("password") || "");
    
            try {
              const res = await SignInRequest(email, password); //send request
    
              if (typeof res !== "string") {
                //responce is valid (boolean)
                router.push("/home");
                // We don't resolve yet to avoid Toolpad showing success before redirect
              }
    
              if (res === "You are not a clinician") {
                //Response when USER is found
                resolve({
                  type: "CredentialsSignin",
                  error: "You are not a clinician",
                });
              } else if (res === "Wrong credentials") {
                resolve({ type: "CredentialsSignin", error: "Wrong credentials" });
              } else {
                // Success case - the router.push is handled, but Toolpad might need a resolution
                resolve({ type: "CredentialsSignin" });
              }
            } catch (error) {
              resolve({ type: "CredentialsSignin", error: String(error) });
            }
          }, 300);
        });
      };

    return { handleSignIn };
};
