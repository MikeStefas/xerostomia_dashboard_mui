"use server";
import { HandleTokenRefreshIfNeeded } from "@/tokenSessionFuncs/handleTokenRefreshIfNeeded";
import { BACKEND_URL } from "../constants";
import { cookies } from "next/headers";

export async function PairClinician({
  clinicianID,
  patientID,
}: {
  clinicianID: number;
  patientID: number;
}) {
  {
    await HandleTokenRefreshIfNeeded();

    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value || "";

    const response = await fetch(`${BACKEND_URL}/clinician/pair-clinician`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ patientID: patientID, clinicianID: clinicianID }),
    });

    if (response.ok) {
      const result = await response.json();
      return result.message;
    } else {
      return "Error creating demographic data";
    }
  }
}
