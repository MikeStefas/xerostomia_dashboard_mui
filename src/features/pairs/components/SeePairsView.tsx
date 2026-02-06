"use client";

import { useFetchPairs } from "@/features/pairs/hooks/fetchPairs";
import UniversalDataGrid from "@/components/UniversalDataGrid";

export default function SeePairsView() {
  const { patients, clinicians, selectedClinicianID, setSelectedClinicianID } = useFetchPairs();

  return (
    <>
      {selectedClinicianID === null ? (
        <UniversalDataGrid data={clinicians} onRowClick={(row) => setSelectedClinicianID(row)} title="Clinicians" />
      ) : (
        <UniversalDataGrid
          data={patients}
          onRowClick={() => {}}
          title="Paired Patients"
          backButton={true}
          onBack={() => setSelectedClinicianID(0)} 
          includeDates={false}
        />
      )}
    </>
  );
}

