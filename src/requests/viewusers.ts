"use server";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/constants";
import { HandleTokenRefreshIfNeeded } from "@/tokenSessionFuncs/handleTokenRefreshIfNeeded";

export async function ViewUsers({
  chooseRole,
  ofClinicianID,
}: {
  chooseRole: "ANY" | "CLINICIAN" | "USER" | null;
  ofClinicianID: number | null;
}) {
  {
    await HandleTokenRefreshIfNeeded();

    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value || "";

    //fetch data
    const response = await fetch(`${BACKEND_URL}/user/view-users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chooseRole: chooseRole,
        ofClinicianID: ofClinicianID,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
}
