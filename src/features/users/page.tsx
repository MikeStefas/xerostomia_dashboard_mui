"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DemographicDataShow from "@/features/demographics/components/demographicDataShow";
import CustomDataGrid from "@/features/users/components/customDataGrid";
import { useFetchUsers } from "./hooks/FetchUsers";
import { useFetchDemographicData } from "./hooks/FetchDemographicData";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import CreateUserForm from "@/features/users/components/CreateUserForm";
import UserDataShow from "./components/userdatashow";
import DemographicForm from "@/features/demographics/components/demographicForm";
import UpdateUserForm from "@/features/users/components/updateUserForm";

export default function UsersPage() {
  const { users, setSelectedUserID, selectedUser, refetch } = useFetchUsers();
  const { demographicData, editingMode, setEditingMode } = useFetchDemographicData(selectedUser?.userID ?? 0);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflowY: "auto", // scrollable
        p: 2,
        gap: 3,
      }}
    >
      {selectedUser === null ? (
        <Box sx={{ width: "90%", mx: "auto", height: "80vh" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h4">Manage Users</Typography>
            <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setIsCreating(true)}
            >
                Create User
            </Button>
          </Stack>

          {isCreating ? (
            <Box sx={{ mb: 4 }}>
                <CreateUserForm 
                    onCancel={() => setIsCreating(false)} 
                    onSuccess={() => {
                        setIsCreating(false);
                        refetch();
                    }}
                />
            </Box>
          ) : (
            <CustomDataGrid
                users={users}
                setSelecteduserID={setSelectedUserID}
                includeDates={true}
            />
          )}
        </Box>
      ) : (
        /* User / Demographic Data Section */
        <Box sx={{ width: "90%", mx: "auto" }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Button onClick={() => setSelectedUserID(0)}>
              <ArrowBackIcon />
            </Button>
            <Typography variant="h4">
              {selectedUser.firstName} {selectedUser.lastName}
            </Typography>
          </Stack>

          {editingMode ? (
            <>
              <UpdateUserForm selectedUser={selectedUser} />
              <DemographicForm
                selectedUser={selectedUser}
                setEditingMode={setEditingMode}
                demographicData={demographicData}
              />
            </>
          ) : (
            <>
              <UserDataShow selectedUser={selectedUser} />
              <DemographicDataShow
                selectedUser={selectedUser}
                setEditingMode={setEditingMode}
                demographicData={demographicData}
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
}


