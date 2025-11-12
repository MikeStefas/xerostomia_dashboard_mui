export interface User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: string | Date; // ISO date string
  updatedAt: string | Date; // ISO date string
  role: "ADMIN" | "PATIENT" | "CLINICIAN"; // could extend with more roles
  institution: string;
}
