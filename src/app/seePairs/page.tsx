"use client";
import { DashboardLayout } from "@toolpad/core";
import { useEffect, useState } from "react";
import { ViewUsers } from "@/requests/viewusers";
import { Clinician } from "@/types/clinician";
import { Patient } from "@/types/patient";
import { Box, Typography } from "@mui/material";
import CustomDataGrid from "@/lists/customDataGrid";

export default function SeePairsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number | null>(
    null
  );

  // Fetch clinicians on load
  useEffect(() => {
    const fetchClinicians = async () => {
      const dataClinicians = await ViewUsers({
        chooseRole: "CLINICIAN",
        ofClinicianID: null,
      });
      setClinicians(dataClinicians);
    };
    fetchClinicians();
  }, []);

  // Fetch patients on Selected clinician id change
  useEffect(() => {
    if (selectedClinicianID === null) return;
    const fetchPatients = async () => {
      const dataPatients = await ViewUsers({
        chooseRole: null,
        ofClinicianID: selectedClinicianID,
      });
      setPatients(dataPatients);
    };
    fetchPatients();
  }, [selectedClinicianID]);

  return (
    <DashboardLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          width: "100%",
          overflowY: "auto", // make entire page scrollable
          p: 4,
        }}
      >
        {/*  CLINICIAN SELECTION */}
        <Box sx={{ width: "90%", height: "100%" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Select a Clinician to view his Pairs
          </Typography>
          <CustomDataGrid
            users={clinicians}
            setSelecteduserID={setSelectedClinicianID}
            includeDates={false}
          />
        </Box>

        {/*  CLINICIAN SELECTION */}
        <Box sx={{ width: "90%", height: "100%", paddingTop: 10 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Paired patiets
          </Typography>
          <CustomDataGrid
            users={patients}
            setSelecteduserID={() => {}}
            includeDates={false}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
