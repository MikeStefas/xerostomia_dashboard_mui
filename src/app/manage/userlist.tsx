'use client';
import { List, Box,  ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { useState } from 'react';




export default function UserList(
  { users, setCurrentUserID }: 
  { users: User[], setCurrentUserID: (number: number) => void }) {


    const [searchQuery, setSearchQuery] = useState('');
    const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
        fullName.includes(searchQuery.toLowerCase()) || 
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });


    return(
<Paper sx={{ width: '400px', height: '100%', borderRight: '1px solid', borderColor: 'divider'}}>
  

  {/* USER LIST  */}
  <List sx={{ height: '100%', overflow: 'auto', width: '100%' }}>



    {/* SEARCH BAR*/}
        <ListItem>
            <TextField
            label="Search User"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </ListItem>

    {filteredUsers.map((user) => (
      <ListItemButton 
        key={user.userID}
        onClick={() => setCurrentUserID(user.userID)}
      >
        <ListItemText
          primary={`USER ID: ${user.userID} | ${user.firstName} ${user.lastName} | Role: ${user.role}`}
          secondary={
            <>
              Email: {user.email} <br />
              Institution: {user.institution} <br />
              Created: {new Date(user.createdAt).toLocaleString()} <br />
              Updated: {new Date(user.updatedAt).toLocaleString()}
            </>
          }
        />
      </ListItemButton>
    ))}
  </List>
</Paper>

      )
}