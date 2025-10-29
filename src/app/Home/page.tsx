"use client";
import { DashboardLayout } from "@toolpad/core";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LinkIcon from "@mui/icons-material/Link";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useContext } from "react";
import { RoleContext } from "../layout";

export default function DashboardPage() {
  const context = useContext(RoleContext);

  return (
    <DashboardLayout sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="text.primary">
        SmileCheck Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 2,
        }}
      >
        {/* Reports */}
        <Card
          sx={{
            flex: "1 1 300px",
            minWidth: 300,
            bgcolor: "background.paper",
            borderLeft: "5px solid",
            borderColor: "primary.main",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <AssignmentIcon
                fontSize="large"
                sx={{ mr: 1, color: "primary.main" }}
              />
              <Typography variant="h6" color="text.primary">
                Reports
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {context?.role === "CLINICIAN" ? (
                <>
                  See a list of your paired patients. Click on a patient to view
                  detailed reports and track progress.
                </>
              ) : (
                <>
                  View all patients and their reports. Admins can access all
                  data.
                </>
              )}
            </Typography>
          </CardContent>
        </Card>

        {/* Create User - Admin only */}
        {context?.role === "ADMIN" && (
          <Card
            sx={{
              flex: "1 1 300px",
              minWidth: 300,
              bgcolor: "background.paper",
              borderLeft: "5px solid",
              borderColor: "secondary.main",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <GroupAddIcon
                  fontSize="large"
                  sx={{ mr: 1, color: "secondary.main" }}
                />
                <Typography variant="h6" color="text.primary">
                  Create User
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Add new users to the system by filling in their details like
                name, email, and role.
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Manage Users - Admin only */}
        {context?.role === "ADMIN" && (
          <Card
            sx={{
              flex: "1 1 300px",
              minWidth: 300,
              bgcolor: "background.paper",
              borderLeft: "5px solid",
              borderColor: "info.main",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <ManageAccountsIcon
                  fontSize="large"
                  sx={{ mr: 1, color: "info.main" }}
                />
                <Typography variant="h6" color="text.primary">
                  Manage Users
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View user data, demographics, and edit information to keep
                everything up to date.
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Pair - Admin only */}
        {context?.role === "ADMIN" && (
          <Card
            sx={{
              flex: "1 1 300px",
              minWidth: 300,
              bgcolor: "background.paper",
              borderLeft: "5px solid",
              borderColor: "success.main",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <LinkIcon
                  fontSize="large"
                  sx={{ mr: 1, color: "success.main" }}
                />
                <Typography variant="h6" color="text.primary">
                  Pair
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Pair clinicians with patients or users to manage who can access
                which reports.
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* See Pairs - Admin only */}
        {context?.role === "ADMIN" && (
          <Card
            sx={{
              flex: "1 1 300px",
              minWidth: 300,
              bgcolor: "background.paper",
              borderLeft: "5px solid",
              borderColor: "warning.main",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <PeopleIcon
                  fontSize="large"
                  sx={{ mr: 1, color: "warning.main" }}
                />
                <Typography variant="h6" color="text.primary">
                  See Pairs
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View all clinicians and their paired patients. Click a clinician
                to see their patient list.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </DashboardLayout>
  );
}
