import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpdateUserForm from "./updateUserForm";
import DemographicForm from "@/features/demographics/components/demographicForm";
import UserCard from "./userCard";
import DemographicCard from "@/features/demographics/components/demographicCard";
import { User } from "../types";
import { DemographicData } from "@/features/demographics/types";

export default function UserManagement({
    selectedUser,
    setSelectedUserID,
    editingMode,
    setEditingMode,
    demographicData,
}: {
    selectedUser: User ;
    setSelectedUserID: (id: number) => void;
    editingMode: boolean;
    setEditingMode: (editingMode: boolean) => void;
    demographicData: DemographicData | null;
}) {
    return (
        <Box>
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
              <UserCard selectedUser={selectedUser} />
              <DemographicCard
                selectedUser={selectedUser}
                setEditingMode={setEditingMode}
                demographicData={demographicData}
              />
            </>
          )}
        </Box>
    );
}