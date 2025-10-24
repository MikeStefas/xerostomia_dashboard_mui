"use server";

import { HandleTokenRefreshIfNeeded } from "@/tokenSessionFuncs/handleTokenRefreshIfNeeded";
import { BACKEND_URL } from "../constants";
import { cookies } from "next/headers";

export async function UpdateDemographicRequest(
  formData: DemographicData,
  currentUserID: number
) {
  {
    await HandleTokenRefreshIfNeeded();

    let cookieStore = await cookies();
    let access_token = cookieStore.get("access_token")?.value || "";

    // finaly fount the problem( it was a string)
    formData.yearOfBirth = Number(formData?.yearOfBirth);

    const payload = { ...formData, userID: currentUserID ?? 0 };
    console.log(payload);

    const response = await fetch(
      `${BACKEND_URL}/demographics/update-demographic-data`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return result.message;
  }
}
