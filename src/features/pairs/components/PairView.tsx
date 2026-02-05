"use client";
import { useState} from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { PairClinician } from "@/features/pairs/api/pairClinician";
import CustomDataGrid from "@/features/users/components/customDataGrid";
import { useFetchPatientsAndClinicians } from "@/features/pairs/hooks/fetchPatientsAndClinicians";

export default function PairView() {
  const [selectedPatientID, setSelectedPatientID] = useState<number | null>(null);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number | null>(null);

  const { patients, clinicians } = useFetchPatientsAndClinicians();

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
          Select a Patient to Pair
        </Typography>
        <CustomDataGrid
          users={patients}
          setSelecteduserID={setSelectedPatientID}
          includeDates={false}
        />
      </Box>

      <Box sx={{ width: "90%", paddingTop: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Select a Clinician to Pair
        </Typography>
        <CustomDataGrid
          users={clinicians}
          setSelecteduserID={setSelectedClinicianID}
          includeDates={false}
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{ my: 4, marginTop: 10 }}
        onClick={async () => {
          if (!selectedPatientID || !selectedClinicianID) {
            alert("Please select both a Patient and a Clinician before pairing.");
            return;
          }

          const result = await PairClinician({
            patientID: selectedPatientID,
            clinicianID: selectedClinicianID,
          });
          alert(result);
        }}
      >
        Pair Selected Patient and Clinician
      </Button>
    </Box>
  );
}
