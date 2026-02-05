"use client";
import { useState} from "react";
import { Box } from "@mui/material";
import { useFetchPatientsAndClinicians } from "@/features/pairs/hooks/fetchPatientsAndClinicians";
import SelectPatient from "./SelectPatient";
import SelectClinician from "./SelectClinician";
import ConfirmPairing from "./ConfirmPairing";

export default function PairView() {
  const [selectedPatientID, setSelectedPatientID] = useState<number | null>(null);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number | null>(null);

  const { patients, clinicians } = useFetchPatientsAndClinicians();

  const selectedPatient = patients.find(p => p.userID === selectedPatientID);
  const selectedClinician = clinicians.find(c => c.userID === selectedClinicianID);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        overflowY: "auto",
        p: 4,
        height: '100%',
      }}
    >
      {selectedPatientID === null ? (
        <SelectPatient patients={patients} setSelectedPatientID={setSelectedPatientID} />
      ) : selectedClinicianID === null ? (
        <SelectClinician clinicians={clinicians} setSelectedClinicianID={setSelectedClinicianID} />
      ) : (
        <ConfirmPairing selectedPatient={selectedPatient!} selectedClinician={selectedClinician!} setSelectedPatientID={setSelectedPatientID} setSelectedClinicianID={setSelectedClinicianID} />
      )}
    </Box>
  );
}

