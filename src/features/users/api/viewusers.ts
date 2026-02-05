"use server";

import { customFetch } from "@/custom-fetch";

export async function ViewUsers({
  chooseRole,
  ofClinicianID,
}: {
  chooseRole: "ANY" | "CLINICIAN" | "PATIENT" | null;
  ofClinicianID: number | null;
}) {
  const response = await customFetch("/user/view-users", {
    method: "POST",
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
