import { Box, Button, Divider, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DemographicData } from "../types";
import { User } from "@/features/users/types";

export default function DemographicCard({
  selectedUser,
  setEditingMode,
  demographicData,
}: {
  selectedUser: User | null;
  setEditingMode: (editingMode: boolean) => void;
  demographicData: DemographicData | null;
}) {
  if (!selectedUser) return null;

  return (
    <Box sx={{ p: 2, flex: 1 }}>
      {selectedUser.role !== "CLINICIAN" ? (
        <Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Demographic Data</Typography>

          <Typography>
            <strong>Year of birth:</strong>{" "}
            {demographicData?.yearOfBirth ?? "N/A"}
          </Typography>
          <Typography>
            <strong>Gender:</strong> {demographicData?.gender ?? "N/A"}
          </Typography>

          <Button
            sx={{ p: 2, borderRadius: "10px" }}
            onClick={() => setEditingMode(true)}
          >
            <EditIcon />
            Edit mode
          </Button>
        </Box>
      ) : (
        <Button
          sx={{ p: 2, borderRadius: "10px" }}
          onClick={() => setEditingMode(true)}
        >
          <EditIcon />
          Edit mode
        </Button>
      )}
    </Box>
  );
}
