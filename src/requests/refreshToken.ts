"use server";
//BEFORE EACH REQUEST CHECK IF THE TOKEN IS EXPIRED
//IF IT IS EXPIRED, REFRESH THE TOKEN AND SAVE IT
import { BACKEND_URL } from "@/constants";
import { cookies } from "next/headers";

export async function RefreshTokenRequest() {
  const cookieStore = await cookies();
  const refresh_token = cookieStore.get("refresh_token")?.value || "";

  const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "GET",
    headers: { Authorization: `Bearer ${refresh_token}` },
  });
  if (response.ok) {
    const result = await response.json();

    const cookieStore = await cookies();

    //Make cookie for newaccesstoken
    cookieStore.set("access_token", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 mins
    });
  }
}
