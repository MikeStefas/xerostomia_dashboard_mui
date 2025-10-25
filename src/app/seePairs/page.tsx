"use client";
import { DashboardLayout } from "@toolpad/core";
import { useEffect, useState } from "react";
import { ViewUsers } from "@/requests/viewusers";
import { Clinician } from "@/types/clinician";
import { Patient } from "@/types/patient";
import { Box, Button, Typography } from "@mui/material";
import CustomUserList from "@/lists/customUserList";
import CustomDataGrid from "@/lists/customDataGrid";

export default function SeePairsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [currentClinicianID, setCurrentClinicianID] = useState<any>(null);
  const [currentPatientID, setCurrentPatientID] = useState<any>(null);

  // Fetch clinicians on load
  useEffect(() => {
    const fetchC = async () => {
      let dataC = await ViewUsers({
        chooseRole: "CLINICIAN",
        ofClinicianID: null,
      });
      setClinicians(dataC);
    };
    fetchC();
  }, []);

  // Fetch patients on current clinician id change
  useEffect(() => {
    if (currentClinicianID === null) return;
    const fetchP = async () => {
      let dataP = await ViewUsers({
        chooseRole: null,
        ofClinicianID: currentClinicianID,
      });
      setPatients(dataP);
    };
    fetchP();
  }, [currentClinicianID]);

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
            setCurrentuserID={setCurrentClinicianID}
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
            setCurrentuserID={setCurrentPatientID}
            includeDates={false}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
