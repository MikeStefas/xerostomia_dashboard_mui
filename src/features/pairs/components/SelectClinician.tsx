import CustomDataGrid from "@/features/users/components/customDataGrid";
import { Clinician } from "@/features/users/types";
import { Box, Typography } from "@mui/material";

export default function SelectClinician({clinicians, setSelectedClinicianID}: {clinicians: Clinician[], setSelectedClinicianID: (id: number) => void}) {
    return (
        <Box sx={{ width: "90%" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Select a Clinician to Pair
          </Typography>
          <CustomDataGrid
            users={clinicians}
            setSelecteduserID={setSelectedClinicianID}
            includeDates={false}
          />
        </Box>
    );
}