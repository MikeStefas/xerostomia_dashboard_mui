"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFetchUsers } from "./hooks/FetchUsers";
import { useFetchDemographicData } from "./hooks/FetchDemographicData";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import UserDataShow from "./components/userdatashow";
import DemographicForm from "@/features/demographics/components/demographicForm";
import UpdateUserForm from "@/features/users/components/updateUserForm";
import UniversalDataGrid from "@/components/UniversalDataGrid";

import CreateUserForm from "@/features/users/components/CreateUserForm";
import DemographicCard from "@/features/demographics/components/demographicCard";

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
        isCreating ? (
            <Box sx={{ width: "90%", mx: "auto" }}>
                <CreateUserForm 
                    onCancel={() => setIsCreating(false)} 
                    onSuccess={() => {
                        setIsCreating(false);
                        refetch();
                    }}
                />
            </Box>
        ) : (
            <UniversalDataGrid
                data={users}
                onRowClick={setSelectedUserID}
                title="Manage Users"
                includeDates={true}
                actions={
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={() => setIsCreating(true)}
                    >
                        Create User
                    </Button>
                }
            />
        )
      ) : (
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
              <DemographicCard
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


