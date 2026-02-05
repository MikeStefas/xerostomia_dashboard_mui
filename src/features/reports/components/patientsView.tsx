import { Patient } from "@/features/users/types";
import UniversalDataGrid from "@/components/UniversalDataGrid";

export default function ReportView({ patients, setselectedPatientID }: { patients: Patient[], setselectedPatientID: (id: number) => void }) {
    return (
        <UniversalDataGrid
            data={patients}
            onRowClick={setselectedPatientID}
            title="Select a Patient"
            backButton={false}
        />
    )
}