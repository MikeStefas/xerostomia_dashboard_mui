"use client";

import { ReportCard } from "@/features/reports/components/reportcard";
import { useFetchPatients } from "@/features/reports/hooks/fetchPatients";
import UniversalDataGrid from "@/components/UniversalDataGrid";

export default function ReportsPage() {
  const { patients, selectedPatientID, setselectedPatientID, reports, selectedReportID, setselectedReportID, selectedReport } = useFetchPatients();

  return (
    <>
      {selectedPatientID === null ? (
        <UniversalDataGrid
            data={patients}
            onRowClick={setselectedPatientID}
            title="Patients"
            backButton={false}
            includeDates={false}
        />
      ) : null}
      
      {selectedPatientID !== null && selectedReportID === null ? (

        <UniversalDataGrid
            data={reports}
            onRowClick={setselectedReportID}
            title="Reports"
            backButton={true}
            onBack={() => setselectedPatientID(null)}
            includeDates={true}
        />
      ) : null}

      {selectedReport && (
          <ReportCard report={selectedReport} setselectedReportID={setselectedReportID} />
      )}
    </>
  );
}
