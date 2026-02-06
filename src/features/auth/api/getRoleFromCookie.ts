"use server";
import { TokenPayload } from "@/features/auth/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

//this will be used to pass the role on reload (layout.tsx)
export async function getRoleFromCookie() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value || "";
  try {
    const role = jwtDecode<TokenPayload>(access_token).role;
    return role;
  } catch {
    return "EXPIRED / NON EXISTANT TOKEN. CAN NOT GET ROLE";
  }
}
