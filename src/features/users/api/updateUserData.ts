"use server";
import { User } from "../types";
import { customFetch } from "@/custom-fetch";

export async function UpdateUserDataRequest(formData: User) {
  const { ...DataSent } = formData;

  const response = await customFetch("/user/update-user-data", {
    method: "PATCH",
    body: JSON.stringify(DataSent),
  });

  const result = await response.json();

  return result.message;
}
