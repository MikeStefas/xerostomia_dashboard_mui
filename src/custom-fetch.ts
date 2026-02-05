"use server";
import { cookies } from "next/headers";
import { HandleTokenRefreshIfNeeded } from "./features/auth/api/handleTokenRefreshIfNeeded";
import { BACKEND_URL } from "./constants";

export async function customFetch(endpoint: string, options: RequestInit = {}) {
    await HandleTokenRefreshIfNeeded();
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value || "";
    
    if (!access_token) {
    console.log("No access token found in session");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response
}