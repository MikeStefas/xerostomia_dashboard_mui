import { Patient } from "@/features/users/types";
import UniversalDataGrid from "@/components/UniversalDataGrid";

export default function SelectPatient({patients, setSelectedPatientID}: {patients: Patient[], setSelectedPatientID: (id: number) => void}) {
    return (
        <UniversalDataGrid
            data={patients}
            onRowClick={setSelectedPatientID}
            title="Select a Patient to Pair"
            backButton={false}
        />
    );
}