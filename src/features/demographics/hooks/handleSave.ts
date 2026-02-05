import { CreateDemographicDataRequest } from "../api/create.demographicsData";
import { UpdateDemographicRequest } from "../api/update.demographicData";
import { User } from "@/features/users/types";
import { DemographicData } from "../types";

export const handleSave = async (selectedUser: User | null, formData: DemographicData, isNew: boolean) => {
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
          alert(res + ". Reloading ...");
          window.location.reload();
        } else {
          console.log(res);
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