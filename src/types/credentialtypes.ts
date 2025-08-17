import { z } from "zod";

export type FormState =
  | {
      error?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SigninFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Contain at least one number.",
    })
    .trim(),
});

export const SignupFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Contain at least one number.",
    })
    .trim(),
  firstName: z
  .string()
  .min(1, { message: "Must not be empty!" })
  .trim(),
  lastName: z
  .string()
  .min(1, { message: "Must not be empty!" })
  .trim()
});

export enum Role {
  ADMIN = "ADMIN",
  CLINICIAN = "CLINICIAN",
  USER = "USER",
}