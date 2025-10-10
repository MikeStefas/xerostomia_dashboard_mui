'use client';
import { DashboardLayout } from "@toolpad/core";
import { Card, CardContent, Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';


export default function DashboardPage() {
  
  return (
    <DashboardLayout sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        SmileCheck Dashboard
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          mt: 2,
        }}
      >
        {/* Clinician Card */}
        <Card sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <PersonIcon fontSize="large" sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Clinicians</Typography>
            </Box>
            <Typography variant="body2">
              Monitor patients and track their progress. Access detailed reports for each patient to ensure proper care and treatment.
            </Typography>
          </CardContent>
        </Card>

        {/* Admin Card */}
        <Card sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <PeopleIcon fontSize="large" sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h6">Administrators</Typography>
            </Box>
            <Typography variant="body2">
              Manage users and clinicians, and view all patients and their reports. Keep the system organized and up to date.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
