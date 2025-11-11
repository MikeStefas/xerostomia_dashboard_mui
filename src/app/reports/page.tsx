"use client";
import { DashboardLayout } from "@toolpad/core";
import { useState, useEffect } from "react";
import { ViewUsers } from "@/requests/viewusers";
import Box from "@mui/material/Box";
import { Patient } from "@/types/patient";
import { Report } from "@/types/report";
import { ReportViewer } from "./reportviewer";
import { ViewUserReports } from "@/requests/viewuserreport";
import CustomDataGrid from "@/lists/customDataGrid";
import CustomReportGrid from "@/lists/customReportGrid";
import { Button, Typography } from "@mui/material";

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientID, setselectedPatientID] = useState<number | null>(
    null
  );
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReportID, setselectedReportID] = useState<number | null>(null);

  const selectedReport = reports.find((r) => r.reportId === selectedReportID);

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
    if (selectedPatientID === null) return;
    const fetchReports = async () => {
      const data = await ViewUserReports(selectedPatientID);
      setReports(data);
    };
    fetchReports();
  }, [selectedPatientID]);

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
            setSelecteduserID={setselectedPatientID}
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
            setSelectedReportID={setselectedReportID}
          />
        </Box>

        {/* Report Viewer */}
        {selectedReport && (
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
            <ReportViewer report={selectedReport} />
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
