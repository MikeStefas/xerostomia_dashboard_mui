"use client";
import { DashboardLayout } from "@toolpad/core";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { ViewUsers } from "@/requests/viewusers";
import { ViewDemographicData } from "@/requests/viewDemographicData";
import DemographicDataZone from "./demographic.datazone";
import DemographicEditZone from "./demographic.editzone";
import CustomDataGrid from "@/lists/customDataGrid";
import { DemographicData } from "@/types/demographicdata";
import { User } from "@/types/user";
import UserDataZone from "./userdatazone";
import UserEditZone from "./usereditzone";
import { get } from "http";
import { getRoleFromCookie } from "@/tokenSessionFuncs/getRoleFromCookie";

export default function DashboardPage() {
  const [demographicData, setDemographicData] =
    useState<DemographicData | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [selectedUserID, setSelectedUserID] = useState<number>(0);
  const selectedUser = users.find((r) => r.userID === selectedUserID) ?? null;

  const [role, setRole] = useState<string>("");
  // Fetch all users on page load
  useEffect(() => {
    const fetchAllUsers = async () => {
      const userData = await ViewUsers({
        chooseRole: "ANY",
        ofClinicianID: null,
      });
      setUsers(userData);
    };
    fetchAllUsers();
  }, []);

  // Fetch demographic data when user changes
  useEffect(() => {
    const fetchDemographicData = async () => {
      const demographicData = await ViewDemographicData(
        selectedUser?.userID ?? 0
      );
      setDemographicData(demographicData);
    };
    fetchDemographicData();
  }, [selectedUser]);

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
