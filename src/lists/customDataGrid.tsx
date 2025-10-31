import { Clinician } from "@/types/clinician";
import { Patient } from "@/types/patient";
import { User } from "@/types/user";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { memo } from "react";

function CustomDataGrid({
  users,
  setSelecteduserID,
  includeDates,
}: {
  users: User[] | Clinician[] | Patient[];
  setSelecteduserID: (id: number) => void;
  includeDates: boolean;
}) {
  //id needed for datagrid
  const rows = users.map((user) => ({
    id: user.userID,
    userID: user.userID,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    institution: user.institution,
    //date formatting
    createdAt:
      "createdAt" in user
        ? new Date(user.createdAt).toLocaleDateString() +
          ", " +
          new Date(user.createdAt).toLocaleTimeString()
        : "",
    updatedAt:
      "updatedAt" in user
        ? new Date(user.updatedAt).toLocaleDateString() +
          ", " +
          new Date(user.updatedAt).toLocaleTimeString()
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
      field: "role",
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

  //User! need to use createdAt and updatedAt if its not empty
  //adds created at and updated at to columns
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
    <DataGrid
      rows={rows}
      columns={columns}
      onRowClick={(params) => {
        // params.row contains the entire row object
        setSelecteduserID(params.row.userID);
      }}
    ></DataGrid>
  );
}

export default memo(CustomDataGrid);
