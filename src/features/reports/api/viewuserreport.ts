"use server";
import { cookies } from "next/headers";
import { BACKEND_URL } from "../../../constants";
import { HandleTokenRefreshIfNeeded } from "@/features/auth/api/handleTokenRefreshIfNeeded";

export async function ViewUserReports(userID: number) {
  await HandleTokenRefreshIfNeeded();

  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value || "";

  //fetch data
  const response = await fetch(`${BACKEND_URL}/reports/view-user-reports`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID: userID }),
  });

  if (response.ok) {
    const result = await response.json();
    if (result.length === 0) {
      return [];
    }
    return result;
  } else {
    return "Failed to fetch data";
  }
}
