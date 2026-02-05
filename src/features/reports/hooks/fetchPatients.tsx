import { useState, useEffect } from "react";
import { Patient } from "@/features/users/types";
import { Report } from "@/features/reports/types";
import { ViewUsers } from "@/features/users/api/viewusers";
import { ViewUserReports } from "@/features/reports/api/viewuserreport";

export function useFetchPatients() {
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
      const data = await ViewUsers({
        chooseRole: "PATIENT",
        ofClinicianID: null,
      }); //if role=CLINICIAN, parameters are not needed
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

  return { patients, selectedPatientID, setselectedPatientID, reports, selectedReportID, setselectedReportID, selectedReport };
}