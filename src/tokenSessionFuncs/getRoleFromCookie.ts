"use server";
import { TokenPayload } from "@/types/tokenpayload";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

//this will be used to pass the role on reload (layout.tsx)
export async function getRoleFromCookie() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value || "";
  try {
    const role = jwtDecode<TokenPayload>(access_token).role;
    console.log(role);
    return role;
  } catch {
    return "EXPIRED TOKEN. CAN NOT GET ROLE";
  }
}
