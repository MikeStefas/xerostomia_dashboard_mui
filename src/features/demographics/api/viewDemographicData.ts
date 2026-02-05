"use server";
import { customFetch } from "@/custom-fetch";

export async function ViewDemographicData(userID: number) {
  //fetch data
  const response = await customFetch("/demographics/view-demographic-data", {
    method: "POST",
    body: JSON.stringify({ userID: userID }),
  });

  if (response.ok) {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      const result = JSON.parse(text);
      return result;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return "Invalid JSON in response";
    }
  } else {
    return "Failed to fetch data";
  }
}
