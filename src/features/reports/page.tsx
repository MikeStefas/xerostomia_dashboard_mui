"use client";

import Box from "@mui/material/Box";
import { ReportViewer } from "@/features/reports/components/reportviewer";
import CustomDataGrid from "@/features/users/components/customDataGrid";
import CustomReportGrid from "@/features/reports/components/customReportGrid";
import { Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFetchPatients } from "@/features/reports/hooks/fetchPatients";

export default function ReportsPage() {
  const { patients, selectedPatientID, setselectedPatientID, reports, selectedReportID, setselectedReportID, selectedReport } = useFetchPatients();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {selectedPatientID === null ? (
        <Box
          sx={{
            marginTop: 4,
            width: "90%",
            mx: "auto",
            flexShrink: 0,
            height: "80vh",
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
      ) : null}
      
      {selectedPatientID !== null && selectedReportID === null ? (
      <Box
        sx={{
          width: "90%",
          mx: "auto",
          flexShrink: 0,
        }}
      > <Stack direction="row" justifyContent="space-between">
        <Button onClick={() => setselectedPatientID(null)}> <ArrowBackIcon /> </Button>
        <Typography variant="h4">{patients.find((p) => p.userID === selectedPatientID)?.firstName} {patients.find((p) => p.userID === selectedPatientID)?.lastName}{"'s Reports"}</Typography>
        </Stack>
        <CustomReportGrid
          reports={reports}
          setSelectedReportID={setselectedReportID}
        />
      </Box>
      ) : null}

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
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={() => setselectedReportID(null)}> <ArrowBackIcon /> </Button>
          </Stack>
          <ReportViewer report={selectedReport} />
        </Box>
      )}
    </Box>
  );
}
