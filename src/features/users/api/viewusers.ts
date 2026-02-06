"use server";

import { customFetch } from "@/custom-fetch";

export async function ViewUsers({
  chooseRole,
  ofClinicianID,
}: {
  chooseRole: "ANY" | "CLINICIAN" | "PATIENT" | null;
  ofClinicianID: number | null;
}) {
  const response = await customFetch("/user/view-users/" + chooseRole + "/" + ofClinicianID, {
    method: "GET",
  });
  console.log(response);

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return result;
  } else {
    throw new Error("Failed to fetch data");
  }
}
