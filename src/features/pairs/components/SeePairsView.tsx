"use client";

import { Box, Typography } from "@mui/material";
import CustomDataGrid from "@/features/users/components/customDataGrid";
import { useFetchPairs } from "@/features/pairs/hooks/fetchPairs";

export default function SeePairsView() {
  const { patients, clinicians, setSelectedClinicianID } = useFetchPairs();

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
