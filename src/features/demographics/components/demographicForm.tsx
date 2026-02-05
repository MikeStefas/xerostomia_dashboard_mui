"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DemographicData } from "../types";
import { User } from "@/features/users/types";
import { handleSave } from "../hooks/handleSave";
import { useHandleForm } from "../hooks/handleForm";

export default function DemographicForm({
  selectedUser,
  setEditingMode,
  demographicData,
}: {
  selectedUser: User | null;
  setEditingMode: (editingMode: boolean) => void;
  demographicData: DemographicData | null;
}) {
  const { formData, isNew, handleInputChange } = useHandleForm(demographicData);

  return selectedUser?.role === "CLINICIAN" ? (
    null
  ) : (
    <Box sx={{ p: 2, flex: 1 }}>
      <Divider sx={{ my: 2 }} />
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6">Demographic Data</Typography>

        <TextField
          label="Year of birth"
          name="yearOfBirth"
          type="number"
          value={formData.yearOfBirth || ""}
          fullWidth
          onChange={handleInputChange}
        />

        <FormControl>
          <FormLabel id="gender-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        <Button sx={{ p: 2 }} onClick={() => handleSave(selectedUser, formData, isNew)}>
          Save Demographic Data
        </Button>

        <Button
          sx={{ p: 2 }}
          onClick={() => setEditingMode(false)}
          startIcon={<EditIcon />}
        >
          Leave Edit Mode
        </Button>
      </Box>
    </Box>
  );
}
