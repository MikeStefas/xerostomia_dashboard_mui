"use server";
import { BACKEND_URL } from "../../../constants";
import { cookies } from "next/headers";
import { User } from "../types";
import { HandleTokenRefreshIfNeeded } from "@/features/auth/api/handleTokenRefreshIfNeeded";

export async function UpdateUserDataRequest(formData: User) {
  await HandleTokenRefreshIfNeeded();

  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value || "";

  const { ...DataSent } = formData;

  const response = await fetch(`${BACKEND_URL}/user/update-user-data`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(DataSent),
  });

  const result = await response.json();

  return result.message;
}
