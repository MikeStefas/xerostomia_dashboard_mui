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
      <Box sx={{ display: "flex", height: "100%" }}>
        <CustomUserList
          users={patients}
          setCurrentuserID={setCurrentPatientID}
          currentuserID={currentPatientID}
          nameOfList="Patient"
        />
        <CustomReportList
          reports={reports}
          setCurrentReportID={setCurrentReportID}
        />
        {currentReport && <ReportViewer report={currentReport} />}
      </Box>
    </DashboardLayout>
  );
}
