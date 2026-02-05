import { useState, useEffect } from "react";
import { Patient, Clinician } from "@/features/users/types";
import { ViewUsers } from "@/features/users/api/viewusers";

export const useFetchPatientsAndClinicians = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [clinicians, setClinicians] = useState<Clinician[]>([]);

    useEffect(() => {
        const fetchPC = async () => {
            const [fetchedPatients, dataC] = await Promise.all([
                ViewUsers({ chooseRole: "PATIENT", ofClinicianID: null }),
                ViewUsers({ chooseRole: "CLINICIAN", ofClinicianID: null }),
            ]);
            setPatients(fetchedPatients);
            setClinicians(dataC);
        };
        fetchPC();
    }, []);

    return { patients, clinicians };
}