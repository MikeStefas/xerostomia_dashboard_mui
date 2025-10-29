import { Box, Typography } from "@mui/material";

export default function UserDataZone({
  selectedUser,
}: {
  selectedUser: User | null;
}) {
  return (
    <Box sx={{ p: 2, flex: 1 }}>
      {selectedUser ? (
        <Box>
          <Typography variant="h6">User Data</Typography>
          <Typography>
            <strong>USER ID:</strong> {selectedUser.userID}
          </Typography>
          <Typography>
            <strong>First Name:</strong> {selectedUser.firstName}
          </Typography>
          <Typography>
            <strong>Last Name:</strong> {selectedUser.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {selectedUser.email}
          </Typography>
          <Typography>
            <strong>Created:</strong>{" "}
            {new Date(selectedUser.createdAt).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Updated:</strong>{" "}
            {new Date(selectedUser.updatedAt).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Role:</strong> {selectedUser.role}
          </Typography>
          <Typography>
            <strong>Institution:</strong> {selectedUser.institution}
          </Typography>
        </Box>
      ) : (
        <Typography>Select a user to see details</Typography>
      )}
    </Box>
  );
}
