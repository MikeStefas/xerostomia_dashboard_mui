"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createUser } from "../api/createUser";

export default function CreateUserForm({ onCancel, onSuccess }: { onCancel: () => void, onSuccess: () => void }) {
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      institution: data.get("institution"),
      role: data.get("role"),
    };

    const result = await createUser(
      user.email!.toString(),
      user.password!.toString(),
      user.firstName!.toString(),
      user.lastName!.toString(),
      user.role!.toString(),
      user.institution!.toString()
    );
    
    if (result === "User created successfully" || result.status === 201) {
      alert("User created successfully");
      onSuccess();
    } else {
      alert(JSON.stringify(result));
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
        position: "relative",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Create New User</Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSignUp}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField name="firstName" label="First Name" required fullWidth />
        <TextField name="lastName" label="Last Name" required fullWidth />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          required
          fullWidth
        />
        <TextField
          name="institution"
          label="Institution (optional, ' - ' if none)"
          required
          fullWidth
        />
        <FormControl>
          <FormLabel id="role-label">Role</FormLabel>
          <RadioGroup
            aria-labelledby="role-label"
            name="role"
            defaultValue={"PATIENT"}
          >
            <FormControlLabel
              value="CLINICIAN"
              control={<Radio />}
              label="Clinician"
            />

            <FormControlLabel
              value="PATIENT"
              control={<Radio />}
              label="Patient"
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
