"use client";

import { Box } from "@mui/material";
import DemographicDataZone from "@/features/demographics/components/demographic.datazone";
import DemographicEditZone from "@/features/demographics/components/demographic.editzone";
import CustomDataGrid from "@/features/users/components/customDataGrid";
import UserDataZone from "@/features/users/components/userdatazone";
import UserEditZone from "@/features/users/components/usereditzone";
import { useFetchUsers } from "./hooks/FetchUsers";
import { useFetchDemographicData } from "./hooks/FetchDemographicData";

export default function UsersPage() {
  const { users, setSelectedUserID, selectedUser } = useFetchUsers();
  const { demographicData, editingMode, setEditingMode } = useFetchDemographicData(selectedUser?.userID ?? 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowY: "auto", // scrollable
        p: 2,
        gap: 3,
      }}
    >
      {/*  DataGrid Section */}
      <Box sx={{ width: "90%", mx: "auto", height: "100%" }}>
        <CustomDataGrid
          users={users}
          setSelecteduserID={setSelectedUserID}
          includeDates={true}
        />
      </Box>

      {/* User / Demographic Data Section */}
      {editingMode ? (
        <>
          <UserEditZone selectedUser={selectedUser} />
          <DemographicEditZone
            selectedUser={selectedUser}
            setEditingMode={setEditingMode}
            demographicData={demographicData}
          />
        </>
      ) : (
        <>
          <UserDataZone selectedUser={selectedUser} />
          <DemographicDataZone
            selectedUser={selectedUser}
            setEditingMode={setEditingMode}
            demographicData={demographicData}
          />
        </>
      )}
    </Box>
  );
}
