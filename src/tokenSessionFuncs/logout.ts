"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function LogoutFunc() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/");
}
