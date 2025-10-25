"use client";
import { DashboardLayout } from "@toolpad/core";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { ViewUsers } from "@/requests/viewusers";
import { Patient } from "@/types/patient";
import { Clinician } from "@/types/clinician";
import { PairClinician } from "@/requests/pairClinician";
import CustomDataGrid from "@/lists/customDataGrid";

export default function PairPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [currentPatientID, setCurrentPatientID] = useState<number | null>(null);
  const [currentClinicianID, setCurrentClinicianID] = useState<number | null>(
    null
  );

  const clinicianSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPC = async () => {
      const dataP = await ViewUsers({
        chooseRole: "USER",
        ofClinicianID: null,
      });
      setPatients(dataP);
      const dataC = await ViewUsers({
        chooseRole: "CLINICIAN",
        ofClinicianID: null,
      });
      setClinicians(dataC);
    };
    fetchPC();
  }, []);

  // 👇 scroll down automatically when a patient is selected
  useEffect(() => {
    if (currentPatientID && clinicianSectionRef.current) {
      clinicianSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPatientID]);

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
        {/*  PATIENT SELECTION */}
        <Box sx={{ width: "90%", height: "100%" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Select a Patient to Pair
          </Typography>
          <CustomDataGrid
            users={patients}
            setCurrentuserID={setCurrentPatientID}
            includeDates={false}
          />
        </Box>

        {/* 👨‍⚕️ CLINICIAN SELECTION */}
        <Box sx={{ width: "90%", height: "100%", paddingTop: 10 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Select a Clinician to Pair
          </Typography>
          <CustomDataGrid
            users={clinicians}
            setCurrentuserID={setCurrentClinicianID}
            includeDates={false}
          />
        </Box>
        {/* PAIR BUTTON */}
        <Button
          variant="contained"
          size="large"
          sx={{ my: 4, marginTop: 10 }}
          onClick={async () => {
            if (!currentPatientID || !currentClinicianID) {
              alert(
                "Please select both a Patient and a Clinician before pairing."
              );
              return;
            }

            const result = await PairClinician({
              patientID: currentPatientID,
              clinicianID: currentClinicianID,
            });
            alert(result);
          }}
        >
          Pair Selected Patient and Clinician
        </Button>
      </Box>
    </DashboardLayout>
  );
}
