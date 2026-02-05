"use server";
import { DemographicData } from "../types";
import { customFetch } from "@/custom-fetch";

export async function UpdateDemographicRequest(
  formData: DemographicData,
  currentUserID: number
) {
  // finaly fount the problem( it was a string)
  formData.yearOfBirth = Number(formData?.yearOfBirth);

  const payload = { ...formData, userID: currentUserID ?? 0 };

  const response = await customFetch(
    "/demographics/update-demographic-data",
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();
  return result.message;
}
