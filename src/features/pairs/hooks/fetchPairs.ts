import { useState, useEffect } from "react";
import { Patient, Clinician } from "@/features/users/types";
import { ViewUsers } from "@/features/users/api/viewusers";

export const useFetchPairs = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number | null>(null);

  useEffect(() => {
    const fetchClinicians = async () => {
      const dataClinicians = await ViewUsers({
        chooseRole: "CLINICIAN",
        ofClinicianID: null,
      });
      setClinicians(dataClinicians);
    };
    fetchClinicians();
  }, []);

  useEffect(() => {
    if (selectedClinicianID === null) return;
    const fetchPatients = async () => {
      const dataPatients = await ViewUsers({
        chooseRole: null,
        ofClinicianID: selectedClinicianID,
      });
      setPatients(dataPatients);
    };
    fetchPatients();
  }, [selectedClinicianID]);

  return { patients, clinicians, setSelectedClinicianID };
}