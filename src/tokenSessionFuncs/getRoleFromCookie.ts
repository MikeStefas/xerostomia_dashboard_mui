'use server';
import { TokenPayload } from "@/types/tokenpayload";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

//this will be used to pass the role on reload (layout.tsx)
export async function getRoleFromCookie() {
    let cookieStore = await cookies();
    let access_token = cookieStore.get('access_token')?.value || '';
    let role = jwtDecode<TokenPayload>(access_token).role;
    console.log(role);
    return role;
}