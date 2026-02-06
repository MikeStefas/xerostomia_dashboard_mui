import { Button, Typography, Stack, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PairClinician } from "@/features/pairs/api/pairClinician";
import { Patient, Clinician } from "@/features/users/types";

export default function ConfirmPairing({selectedPatient, selectedClinician, setSelectedPatientID, setSelectedClinicianID}: {selectedPatient: Patient, selectedClinician: Clinician, setSelectedPatientID: (id: number | null) => void, setSelectedClinicianID: (id: number | null) => void}) {
    return (
        <Box sx={{ maxWidth: 600, textAlign: 'center', mx: 'auto' }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Button onClick={() => setSelectedClinicianID(null)}>
              <ArrowBackIcon />
            </Button>
            <Typography variant="h4">Confirm Pairing</Typography>
          </Stack>

          
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Patient</Typography>
                <Typography variant="h5">{selectedPatient?.firstName} {selectedPatient?.lastName}</Typography>
                <Typography variant="body2">{selectedPatient?.email}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Clinician</Typography>
                <Typography variant="h5">{selectedClinician?.firstName} {selectedClinician?.lastName}</Typography>
                <Typography variant="body2">{selectedClinician?.email}</Typography>
              </Box>
            </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={async () => {
              const result = await PairClinician({
                patientID: selectedPatient.userID,
                clinicianID: selectedClinician.userID,
              });
              alert(result);
              if (result === "Users are now paired" || result.includes("Success")) {
                setSelectedPatientID(null);
                setSelectedClinicianID(null);
              }
            }}
          >
            Confirm and Pair
          </Button>
        </Box>
    );
}