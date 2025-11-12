"use client";

import { DashboardLayout } from "@toolpad/core";
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
} from "@mui/material";
import { createUser } from "@/requests/createUser";

export default function CreateUserPage() {
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
    alert(JSON.stringify(result));
  };

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
      >
        <Box
          component="form"
          onSubmit={handleSignUp}
          display="flex"
          flexDirection="column"
          gap={2}
          width={400}
        >
          <Typography variant="h5" textAlign="center">
            Create User
          </Typography>
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
                defaultChecked
              />
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
