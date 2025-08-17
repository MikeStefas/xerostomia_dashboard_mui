'use client';
import { DashboardLayout } from "@toolpad/core";
import { Box, Typography, List, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { useState } from 'react';

export default function DashboardPage() {
  // Generate demo patients
  const patients = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    firstName: `Patient${i + 1}`,
    lastName: `Lastname${i + 1}`,
    email: `patient${i + 1}@example.com`,
    reports: [
      {
        id: i * 10 + 1,
        title: "Annual Checkup",
        date: `2025-08-${String((i % 28) + 1).padStart(2, '0')}`,
        time: "09:00 AM",
      },
      {
        id: i * 10 + 2,
        title: "Blood Test",
        date: `2025-08-${String(((i + 5) % 28) + 1).padStart(2, '0')}`,
        time: "11:30 AM",
      },
      {
        id: i * 10 + 3,
        title: "X-ray",
        date: `2025-08-${String(((i + 10) % 28) + 1).padStart(2, '0')}`,
        time: "02:15 PM",
      },
    ]
  }));

  const [selectedPatientId, setSelectedPatientId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName} ${patient.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  return (
    <DashboardLayout>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Patient List */}
        <Paper sx={{ width: '35%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>Patients</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <ListItemButton
                  key={patient.id}
                  selected={selectedPatientId === patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                >
                  <ListItemText
                    primary={`${patient.firstName} ${patient.lastName}`}
                    secondary={patient.email}
                  />
                </ListItemButton>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                No patients found.
              </Typography>
            )}
          </List>
        </Paper>

        {/* Reports */}
        <Paper sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
          {selectedPatient ? (
            <>
              <Typography variant="h6" gutterBottom>
                Reports for {selectedPatient.firstName} {selectedPatient.lastName}
              </Typography>
              <List>
                {selectedPatient.reports.map((report) => (
                  <ListItemButton key={report.id}>
                    <ListItemText
                      primary={report.title}
                      secondary={`${report.date} • ${report.time}`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Select a patient to view their reports.
            </Typography>
          )}
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
