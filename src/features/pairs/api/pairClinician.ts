"use server";
import { customFetch } from "@/custom-fetch";

export async function PairClinician({
  clinicianID,
  patientID,
}: {
  clinicianID: number;
  patientID: number;
}) {
  const response = await customFetch("/clinician/pair-clinician", {
    method: "POST",
    body: JSON.stringify({ patientID: patientID, clinicianID: clinicianID }),
  });

  if (response.ok) {
    const result = await response.json();
    return result.message;
  } else {
    return "Error creating demographic data";
  }
}
