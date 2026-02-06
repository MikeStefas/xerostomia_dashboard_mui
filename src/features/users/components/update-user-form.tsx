import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { User } from "../types";
import { useFormHandler } from "../hooks/form-handler";

export default function UpdateUserForm({
  selectedUser,
}: {
  selectedUser: User | null;
}) {
  const {formData, handleInputChange, handleSave, setFormData} = useFormHandler(selectedUser);

  return (
    <Box sx={{ flex: 1, width: '30%', margin: 'auto', minWidth: 400 }}>
      {formData ? (
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h6">Edit User Data</Typography>

          <Typography variant="body1">User ID: {formData.userID}</Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            fullWidth
            onChange={handleInputChange}
          />
          <Typography variant="body1">
            Password has to be over 8 characters long
          </Typography>
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            label="Institution"
            name="institution"
            value={formData.institution}
            fullWidth
            onChange={handleInputChange}
          />

          {/* ROLE  radiobutton*/}
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              value={formData?.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "PATIENT" | "CLINICIAN",
                })
              }
            >
              <FormControlLabel
                value="PATIENT"
                control={<Radio />}
                label="Patient"
              />
              <FormControlLabel
                value="CLINICIAN"
                control={<Radio />}
                label="Clinician"
              />
            </RadioGroup>
          </FormControl>

          <Button sx={{ p: 2 }} onClick={handleSave}>
            Save User Data
          </Button>
        </Box>
      ) : (
        <Typography>Select a user to see details</Typography>
      )}
    </Box>
  );
}
