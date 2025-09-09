'use client';

import { DashboardLayout } from "@toolpad/core";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createUser } from "@/requests/createUser";


export default function CreateUserPage() {

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    let result = await createUser(
      user.email!.toString(),
      user.password!.toString(),
      user.firstName!.toString(),
      user.lastName!.toString()
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
          <Typography variant="h5" textAlign="center">Create User</Typography>
          <TextField name="firstName" label="First Name" required fullWidth />
          <TextField name="lastName" label="Last Name" required fullWidth />
          <TextField name="email" label="Email" type="email" required fullWidth />
          <TextField name="password" label="Password" type="password" required fullWidth />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
