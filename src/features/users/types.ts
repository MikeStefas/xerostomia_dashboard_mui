export type Clinician = {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  role: "CLINICIAN";
};

export type Patient = {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  institution: " ";
  role: "PATIENT";
};

export interface User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: string | Date; 
  updatedAt: string | Date; 
  role: "ADMIN" | "PATIENT" | "CLINICIAN"; 
  institution: string;
}

export interface Roles {
  role: "ADMIN" | "PATIENT" | "CLINICIAN";
}