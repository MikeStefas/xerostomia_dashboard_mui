import { Box, Typography, Button, Stack } from "@mui/material";
import { Clinician, Patient, User } from "@/features/users/types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReactNode } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface UniversalDataGridProps {
  data: User[] | Clinician[] | Patient[];
  onRowClick: (id: number) => void;
  title: string;
  backButton?: boolean;
  onBack?: () => void;
  includeDates?: boolean;
  actions?: ReactNode;
}

export default function UniversalDataGrid({ 
  data, 
  onRowClick, 
  title, 
  backButton = false, 
  onBack, 
  includeDates = false,
  actions
}: UniversalDataGridProps) {

  //id needed for datagrid
  const rows = data.map((item) => ({
    id: item.userID,
    userID: item.userID,
    firstName: item.firstName,
    lastName: item.lastName,
    role: "role" in item ? item.role : "", 
    email: item.email,
    institution: "institution" in item ? item.institution : "",
    role_val: "role" in item ? item.role : "", 
    
    //date formatting
    createdAt:
      "createdAt" in item
        ? new Date(item.createdAt).toLocaleDateString() +
          ", " +
          new Date(item.createdAt).toLocaleTimeString()
        : "",
    updatedAt:
      "updatedAt" in item
        ? new Date(item.updatedAt).toLocaleDateString() +
          ", " +
          new Date(item.updatedAt).toLocaleTimeString()
        : "",
  }));

  const columns: GridColDef[] = [
    {
      field: "userID",
      headerName: "User ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      minWidth: 150,
    },
    {
        field: "role_val",
        headerName: "Role",
        flex: 1,
        minWidth: 120,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.3,
      minWidth: 200,
    },
    {
      field: "institution",
      headerName: "Institution",
      flex: 1,
      minWidth: 180,
    },
  ];

  if (includeDates) {
    columns.push({
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 180,
    });
    columns.push({
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      minWidth: 180,
    });
  }

    return (
        <Box
          sx={{
            marginTop: 4,
            width: "90%",
            mx: "auto",
            flexShrink: 0,
            height: "80vh",
            marginBottom: 8,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                {backButton && onBack && (
                <Button onClick={onBack}>
                    <ArrowBackIcon />
                </Button>
                )}
                <Typography variant="h4">{title}</Typography>
            </Stack>
            {actions && <Box>{actions}</Box>}
          </Stack>
          
          <DataGrid
            sx={{
            height: "50vh",
            }}
            rows={rows}
            columns={columns}
            onRowClick={(params) => {
                onRowClick(params.row.userID);
            }}
            />
        </Box>
    )
}
