"use client";
import { DashboardLayout } from "@toolpad/core";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
