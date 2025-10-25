"use client";
import { DashboardLayout } from "@toolpad/core";
import { useState, useEffect } from "react";
import { ViewUsers } from "@/requests/viewusers";
import Box from "@mui/material/Box";
import { Patient } from "@/types/patient";
import { Report } from "@/types/report";
import { ReportViewer } from "./reportviewer";
import CustomUserList from "@/lists/customUserList";
import { ViewUserReports } from "@/requests/viewuserreport";
import { CustomReportList } from "@/lists/customReportList";
import CustomDataGrid from "@/lists/customDataGrid";
import CustomReportGrid from "@/lists/customReportGrid";
import { Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatientID, setCurrentPatientID] = useState<any>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [currentReportID, setCurrentReportID] = useState<any>(null);

  const currentReport = reports.find((r) => r.id === currentReportID);

  // Fetch ALL patients on load
  useEffect(() => {
    const fetchPatients = async () => {
      const data = await ViewUsers({ chooseRole: "USER", ofClinicianID: null }); //if role= CLINICIAN, parameters are not needed
      setPatients(data);
    };
    fetchPatients();
  }, []);

  // Fetch reports on patient id change
  useEffect(() => {
    if (currentPatientID === null) return;
    const fetchReports = async () => {
      const data = await ViewUserReports(currentPatientID);
      setReports(data);
    };
    fetchReports();
  }, [currentPatientID]);

  return (
    <DashboardLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          width: "100%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {/* Patient Grid */}
        <Box
          sx={{
            marginTop: 4,
            width: "90%",
            mx: "auto",
            flexShrink: 0,
            height: "100%",
            marginBottom: 8,
          }}
        >
          <Typography variant="h4">Select a Patient</Typography>
          <CustomDataGrid
            users={patients}
            setCurrentuserID={setCurrentPatientID}
            includeDates={false}
          />
        </Box>

        {/* Report Grid */}
        <Box
          sx={{
            width: "90%",
            mx: "auto",
            flexShrink: 0,
          }}
        >
          <Typography variant="h4">Select a Report</Typography>
          <CustomReportGrid
            reports={reports}
            setCurrentReportID={setCurrentReportID}
          />
        </Box>

        {/* Report Viewer */}
        {currentReport && (
          <Box
            sx={{
              mx: "auto",
              marginTop: 8,
              width: "90%",
              flexGrow: 1,
              overflowY: "auto",
              minHeight: "400px",
            }}
          >
            <ReportViewer report={currentReport} />
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
