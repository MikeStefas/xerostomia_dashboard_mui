"use client";
import { Clinician } from "@/types/clinician";
import { Patient } from "@/types/patient";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

export default function CustomUserList({
  users,
  setCurrentuserID,
  currentuserID,
  nameOfList,
}: {
  users: Clinician[] | Patient[] | User[];
  setCurrentuserID: (id: number) => void;
  currentuserID: number;
  nameOfList: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [width, setWidth] = useState(400);

  const filteredUsers = (users ?? []).filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Paper
      sx={{
        width: width,
        height: "100%",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* COLLAPSE TOGGLE */}
      {width === 400 ? (
        <Box sx={{ height: "25%" }}>
          <ListItemButton
            onClick={() => setWidth(80)}
            sx={{
              justifyContent: "space-between",
              position: "sticky",
              zIndex: 1,
              height: "50px",
            }}
          >
            {nameOfList} List
            <ArrowBackIcon />
          </ListItemButton>
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
        </Box>
      ) : (
        <ListItemButton
          onClick={() => setWidth(400)}
          sx={{ justifyContent: "center" }}
        >
          <ArrowForwardIcon />
        </ListItemButton>
      )}

      <List sx={{ height: "75%", overflow: "auto", width: width }}>
        {/* LIST */}
        {/* ONLY SHOW CONTENT IF NOT COLLAPSED */}
        {width === 400 && (
          <>
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
                    primary={`First Name: ${user.firstName}, Last Name: ${user.lastName}`}
                    secondary={
                      <>
                        User ID: {user.userID} <br />
                        Role: {user.role} <br />
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
