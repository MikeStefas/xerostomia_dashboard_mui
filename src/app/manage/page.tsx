'use client';
import { DashboardLayout} from "@toolpad/core";
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { ViewUsers } from "@/requests/viewusers";
import { ViewUserDemographicData } from "@/requests/viewuserdemographicdata";
import UserDataZone from "./userdatazone";
import UserEditZone from "./usereditzone";
import DemographicDataZone from "./demographic.datazone";
import DemographicEditZone from "./demographic.editzone";
import CustomUserList from "@/lists/customUserList";

export default function DashboardPage() {



  //Demographic Data on different table in the db
  const[demographicData, setDemographicData] = useState<DemographicData | null>(null);
  
  const [editingMode, setEditingMode] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserID, setCurrentUserID] = useState<number>(0);

  const currentUser = users.find(r => r.userID === currentUserID) ?? null;


  // Fetch ALL users on load
  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await ViewUsers("ANY"); //USERS and CLINICIANS (NOT ADMINS)
      setUsers(data);
    };
    fetchAllUsers();
  }, []);


  //get demographic Data on user change
  useEffect(() => {
          const fetchDemographicData = async () => {
            const data = await ViewUserDemographicData(currentUser?.userID ?? 0);
            setDemographicData(data);
          };
          fetchDemographicData();
        }, [currentUser]);



  return (
    <DashboardLayout >
      <Box sx={{ display: 'flex', direction: 'row', height: '100%' }}>

        <CustomUserList 
        users={users}
        setCurrentuserID={setCurrentUserID}
        currentuserID={currentUserID}
        />

        {editingMode //true or false
          ?
          <Box sx={{ overflow: 'auto', width: '100%'}}>
              {/* WILL RENDER ON EDITING MODE */}
              <UserEditZone
              currentUser={currentUser} 
              /> 
              <DemographicEditZone 
              currentUser={currentUser} 
              setEditingMode={setEditingMode} 
              demographicData={demographicData}
              />
          </Box>
          :
          <Box sx={{ overflow: 'auto'}}>
            {/* WILL RENDER ON NON EDITING MODE */}
              <UserDataZone 
              currentUser={currentUser} 
              />
              <DemographicDataZone 
              currentUser={currentUser} 
              setEditingMode={setEditingMode}
              demographicData={demographicData}
               />
          </Box>
           }

      </Box>
    </DashboardLayout>
  );
}