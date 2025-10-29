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
import { useState, useEffect } from "react";
import { UpdateDemographicRequest } from "@/requests/update.demographicData";
import { CreateDemographicDataRequest } from "@/requests/create.demographicsData";
import { useRouter } from "next/navigation";

export default function DemographicEditZone({
  selectedUser,
  setEditingMode,
  demographicData,
}: {
  selectedUser: User | null;
  setEditingMode: (editingMode: boolean) => void;
  demographicData: DemographicData | null;
}) {
  const [formData, setFormData] = useState<DemographicData>({
    yearOfBirth: 0,
    gender: "Missing",
  });
  const [isNew, setIsNew] = useState(true);
  const router = useRouter();

  // Update form data when demographicData changes
  useEffect(() => {
    if (demographicData) {
      setFormData({
        yearOfBirth: demographicData.yearOfBirth,
        gender: demographicData.gender,
      });
      setIsNew(false);
    }
    // if no demographic data exist in the db
    else {
      setIsNew(true);
      setFormData({
        yearOfBirth: 0,
        gender: "Missing",
      });
    }
  }, [demographicData]);

  // Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "yearOfBirth"
          ? Number(value) //stored as number
          : value,
    }));
  };

  // Save handler
  const handleSave = async () => {
    try {
      if (!selectedUser) {
        alert("No user found.");
        return;
      }

      if (isNew) {
        const res = await CreateDemographicDataRequest(
          {
            yearOfBirth: formData.yearOfBirth,
            gender: formData.gender,
          },
          selectedUser.userID
        );
        //alert ONLY if it was successful else display error
        if (res === "Success") {
          alert(res + " .Reloading ...");
          router.push("/Home");
        } else {
          alert(res);
        }
      } else {
        const res = await UpdateDemographicRequest(
          {
            yearOfBirth: formData.yearOfBirth,
            gender: formData.gender,
          },
          selectedUser.userID
        );

        //alert ONLY if it was successful else display error
        if (res === "Success") {
          alert(res + ". Reloading ...");
          window.location.reload();
        } else {
          alert(res);
        }
      }
    } catch (err) {
      alert("Error saving demographic data.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 2, flex: 1 }}>
      <Divider sx={{ my: 2 }} />
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6">Demographic Data</Typography>

        {/* Year of Birth */}
        <TextField
          label="Year of birth"
          name="yearOfBirth"
          type="number"
          value={formData.yearOfBirth || ""}
          fullWidth
          onChange={handleInputChange}
        />

        {/* Gender */}
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
            <FormControlLabel
              value="missing"
              control={<Radio />}
              label="Missing"
            />
          </RadioGroup>
        </FormControl>

        <Button sx={{ p: 2 }} onClick={handleSave}>
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
