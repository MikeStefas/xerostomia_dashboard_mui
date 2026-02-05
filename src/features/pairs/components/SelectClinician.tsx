import { Clinician } from "@/features/users/types";
import UniversalDataGrid from "@/components/UniversalDataGrid";

export default function SelectClinician({clinicians, setSelectedClinicianID}: {clinicians: Clinician[], setSelectedClinicianID: (id: number) => void}) {
    return (
        <UniversalDataGrid
            data={clinicians}
            onRowClick={setSelectedClinicianID}
            title="Select a Clinician to Pair"
            backButton={false}
        />
    );
}