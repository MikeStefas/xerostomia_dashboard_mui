import CustomDataGrid from "@/features/users/components/customDataGrid";
import { Patient } from "@/features/users/types";
import { Box, Typography } from "@mui/material";

export default function SelectPatient({patients, setSelectedPatientID}: {patients: Patient[], setSelectedPatientID: (id: number) => void}) {
    return (
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
    );
}