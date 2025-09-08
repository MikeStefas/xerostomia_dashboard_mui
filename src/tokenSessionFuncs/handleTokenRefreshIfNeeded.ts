import { RefreshTokenRequest } from "@/requests/refreshToken";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function HandleTokenRefreshIfNeeded() {
    let cookieStore = await cookies();
    let access_token = cookieStore.get('access_token')?.value || '';
    if (isTokenExpired(access_token)) {
        await RefreshTokenRequest();
    }
}

export function isTokenExpired(access_token: string) {
    try {
    const decoded: { exp?: number } = jwtDecode(access_token);
    if (!decoded.exp) return false; // no exp claim, assume not expired

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return decoded.exp < now;
    } catch {
    // token malformed
    return true;
    }
}