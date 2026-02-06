"use client";
import { DashboardLayout } from "@toolpad/core";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <Box
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "1600px",
          mx: "auto",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </DashboardLayout>
  );
}
