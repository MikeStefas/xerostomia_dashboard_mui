"use server";
import { customFetch } from "@/custom-fetch";

export async function ViewUserReports(userID: number) {
  //fetch data
  const response = await customFetch("/reports/view-user-reports", {
    method: "POST",
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
