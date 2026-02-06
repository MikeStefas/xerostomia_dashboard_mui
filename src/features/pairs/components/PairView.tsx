"use client";
import { useState} from "react";
import { useFetchPatientsAndClinicians } from "@/features/pairs/hooks/fetchPatientsAndClinicians";
import ConfirmPairing from "./ConfirmPairing";
import UniversalDataGrid from "@/components/UniversalDataGrid";

export default function PairView() {
  const [selectedPatientID, setSelectedPatientID] = useState<number | null>(null);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number | null>(null);

  const { patients, clinicians } = useFetchPatientsAndClinicians();

  const selectedPatient = patients.find(p => p.userID === selectedPatientID);
  const selectedClinician = clinicians.find(c => c.userID === selectedClinicianID);

  return (
    <>
      {selectedPatientID === null ? (
        <UniversalDataGrid data={patients} onRowClick={(row) => setSelectedPatientID(row)} title="Patients" />
      ) : selectedClinicianID === null ? (
        <UniversalDataGrid data={clinicians} onRowClick={(row) => setSelectedClinicianID(row)} title="Clinicians" backButton={true} onBack={() => setSelectedPatientID(null)} />
      ) : (
        <ConfirmPairing selectedPatient={selectedPatient!} selectedClinician={selectedClinician!} setSelectedPatientID={setSelectedPatientID} setSelectedClinicianID={setSelectedClinicianID} />
      )}
    </>
  );
}

