
import { Box, Typography } from '@mui/material';



export default function UserDataZone(
    { currentUser }: 
    { currentUser: User | null}) {
      
      

    return (
        <Box sx={{ p: 2, flex: 1 }}>
        {currentUser ? (
          <Box>
            <Typography variant="h6">User Data</Typography>
            <Typography><strong>USER ID:</strong> {currentUser.userID}</Typography>
            <Typography><strong>First Name:</strong> {currentUser.firstName}</Typography>
            <Typography><strong>Last Name:</strong> {currentUser.lastName}</Typography>
            <Typography><strong>Email:</strong> {currentUser.email}</Typography>
            <Typography><strong>Created:</strong> {new Date(currentUser.createdAt).toLocaleString()}</Typography>
            <Typography><strong>Updated:</strong> {new Date(currentUser.updatedAt).toLocaleString()}</Typography>
            <Typography><strong>Role:</strong> {currentUser.role}</Typography>
            <Typography><strong>Institution:</strong> {currentUser.institution}</Typography>
            

            
          </Box>
        ) : (
          <Typography>Select a user to see details</Typography>
        )}
      </Box>
    );
}