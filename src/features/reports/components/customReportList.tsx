"use client";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { Report } from "../types";

export function CustomReportList({
  reports,
  setCurrentReportID,
}: {
  reports: Report[];
  setCurrentReportID: (id: number) => void;
}) {
  const [width, setWidth] = useState(400);

  return (
    <Paper sx={{ width: width, height: "100%" }}>
      {/* COLLAPSE TOGGLE */}
      {width === 400 ? (
        <ListItemButton
          onClick={() => setWidth(80)}
          sx={{
            justifyContent: "space-between",
            position: "sticky",
            zIndex: 1,
            height: "10%",
          }}
        >
          <ArrowBackIcon />
        </ListItemButton>
      ) : (
        <ListItemButton
          onClick={() => setWidth(400)}
          sx={{ justifyContent: "center" }}
        >
          <ArrowForwardIcon />
        </ListItemButton>
      )}

      <List sx={{ width: width, overflow: "auto", height: "90%" }}>
        {/* LIST COMPONENTS */}
        {
          width === 400 ? (
            // DISPLAY reports ONLY IF ITS NOT SHRINKED
            reports.length === 0 ? (
              <Typography sx={{ p: 2 }}>No reports</Typography>
            ) : (
              reports.map((report) => (
                <ListItemButton
                  key={report.reportId}
                  onClick={() => setCurrentReportID(report.reportId)}
                >
                  <ListItemText
                    primary={new Date(report.createdAt).toLocaleDateString()}
                    secondary={new Date(report.createdAt).toLocaleTimeString()}
                  />
                </ListItemButton>
              ))
            )
          ) : (
            " "
          ) //RENDER NOTHING IF SHRINKED
        }
      </List>
    </Paper>
  );
}
