import { DemographicData } from "../types";
import { useState, useEffect } from "react";

export const useHandleForm = (demographicData: DemographicData | null) => {
const [formData, setFormData] = useState<DemographicData>({
    yearOfBirth: 0,
    gender: "Missing",
  });
  const [isNew, setIsNew] = useState(true);

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

  return { formData, isNew, handleInputChange };
}