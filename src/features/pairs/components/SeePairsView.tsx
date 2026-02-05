"use client";

import { Box } from "@mui/material";
import { useFetchPairs } from "@/features/pairs/hooks/fetchPairs";
import SelectClinician from "./SelectClinician";
import UniversalDataGrid from "@/components/UniversalDataGrid";

export default function SeePairsView() {
  const { patients, clinicians, selectedClinicianID, setSelectedClinicianID } = useFetchPairs();

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
      {selectedClinicianID === null ? (
        <SelectClinician clinicians={clinicians} setSelectedClinicianID={setSelectedClinicianID} />
      ) : (
        <UniversalDataGrid
          data={patients}
          onRowClick={() => {}}
          title="Paired Patients"
          backButton={true}
          onBack={() => setSelectedClinicianID(0)} // Reset to 0 or null depending on type, assuming 0 based on previous context 
          includeDates={false}
        />
      )}
    </Box>
  );
}

