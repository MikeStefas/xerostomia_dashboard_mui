"use server";

import { SignupFormSchema } from "@/features/auth/types";
import { customFetch } from "@/custom-fetch";

export async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: string,
  institution: string
) {
  const data = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    role: role,
    institution: institution,
  };

  //validate the email and password
  const validationFields = SignupFormSchema.safeParse(data);

  if (!validationFields.success) {
    return "The password must be 8+ letters and have 1+ numbers---The email should have the schema of an email---First and Last Name must not be empty.";
  }

  //request to signin
  const response = await customFetch("/auth/create-user", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    return result.message;
  } else {
    return "failed";
  }
}
