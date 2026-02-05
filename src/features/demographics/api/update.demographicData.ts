"use server";

import { HandleTokenRefreshIfNeeded } from "@/features/auth/api/handleTokenRefreshIfNeeded";
import { BACKEND_URL } from "../../../constants";
import { cookies } from "next/headers";
import { DemographicData } from "../types";

export async function UpdateDemographicRequest(
  formData: DemographicData,
  currentUserID: number
) {
  {
    await HandleTokenRefreshIfNeeded();

    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value || "";

    // finaly fount the problem( it was a string)
    formData.yearOfBirth = Number(formData?.yearOfBirth);

    const payload = { ...formData, userID: currentUserID ?? 0 };

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
