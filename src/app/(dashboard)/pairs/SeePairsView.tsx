"use client";
import { useEffect, useState } from "react";
import { ViewUsers } from "@/features/users/api/viewusers";
import { Clinician } from "@/features/users/types";
import { Patient } from "@/features/users/types";
import { Box, Typography } from "@mui/material";
import CustomDataGrid from "@/features/users/components/customDataGrid";

export default function SeePairsView() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number | null>(null);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: "100%",
        overflowY: "auto",
        p: 4,
        height: '100%',
      }}
    >
      <Box sx={{ width: "90%" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Select a Clinician to view his Pairs
        </Typography>
        <CustomDataGrid
          users={clinicians}
          setSelecteduserID={setSelectedClinicianID}
          includeDates={false}
        />
      </Box>

      <Box sx={{ width: "90%", paddingTop: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Paired patients
        </Typography>
        <CustomDataGrid
          users={patients}
          setSelecteduserID={() => {}}
          includeDates={false}
        />
      </Box>
    </Box>
  );
}
