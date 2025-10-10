
import { Box, Button, Divider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';




export default function DemographicDataZone(
    { currentUser, setEditingMode, demographicData }: 
    { currentUser: User | null, setEditingMode: (editingMode: boolean) => void,
     demographicData: DemographicData | null
     }) {
      
      

    return (
        <Box sx={{ p: 2, flex: 1 }}>
        {currentUser ? (
          <Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Demographic Data</Typography>

            <Typography><strong>Year of birth:</strong> {demographicData?.yearOfBirth ?? 'N/A'}</Typography>
            <Typography><strong>Gender:</strong> {demographicData?.gender ?? 'N/A'}</Typography>

            <Button 
            sx ={{ p: 2, borderRadius: '10px'}}
            onClick={() => setEditingMode(true)}
            >
              <EditIcon />Edit mode
            </Button>
          </Box>
        ) : " "}
      </Box>
    );
}