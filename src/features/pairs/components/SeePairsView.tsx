"use client";

import { Box } from "@mui/material";
import CustomDataGrid from "@/features/users/components/customDataGrid";
import { useFetchPairs } from "@/features/pairs/hooks/fetchPairs";
import SelectClinician from "./SelectClinician";

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
        <CustomDataGrid
          users={patients}
          setSelecteduserID={() => {}}
          includeDates={false}
        />
      )}
    </Box>
  );
}

