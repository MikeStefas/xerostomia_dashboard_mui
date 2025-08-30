interface User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  role: "ADMIN" | "USER" | "CLINICIAN" ; // could extend with more roles
  institution: string;
}
