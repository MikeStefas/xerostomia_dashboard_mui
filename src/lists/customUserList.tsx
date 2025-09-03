'use client';
import { Clinician } from '@/types/clinician';
import { Patient } from '@/types/patient';
import { List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

export default function CustomUserList(
  { users, setCurrentuserID, currentuserID }: 
  { users: Clinician[] | Patient[] | User[], setCurrentuserID: (id: number) => void, currentuserID: number }
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [width, setWidth] = useState(400);

  const filteredUsers = (users ?? []).filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Paper sx={{ width: width, height: '100%', borderRight: '1px solid', borderColor: 'divider' }}>
      <List sx={{ height: '100%', overflow: 'auto', width: width }}>

        {/* COLLAPSE TOGGLE */}
        {width === 400 ? (
          <ListItemButton onClick={() => setWidth(80)} sx={{ justifyContent: 'space-between' }}>
            Users List
            <ArrowBackIcon />
          </ListItemButton>
        ) : (
          <ListItemButton onClick={() => setWidth(400)} sx={{ justifyContent: 'center' }}>
            <ArrowForwardIcon />
          </ListItemButton>
        )}

        {/* ONLY SHOW CONTENT IF NOT COLLAPSED */}
        {width === 400 && (
          <>
            {/* SEARCH BAR */}
            <ListItem>
              <TextField
                label="Search by full name"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </ListItem>

            {filteredUsers.length === 0 ? (
              <Typography sx={{ p: 2 }}>No users</Typography>
            ) : (
              filteredUsers.map((user) => (
                <ListItemButton
                  key={user.userID}
                  onClick={() => setCurrentuserID(user.userID)}
                  selected={currentuserID === user.userID}
                >
                  <ListItemText
                    primary={`user ID: ${user.userID} | ${user.firstName} ${user.lastName} | ${user.role}`}
                    secondary={
                      <>
                        Email: {user.email} <br />
                        Institution: {user.institution} <br />
                      </>
                    }
                  />
                </ListItemButton>
              ))
            )}
          </>
        )}
      </List>
    </Paper>
  );
}
