'use client';
import { DashboardLayout } from "@toolpad/core";
import { useEffect, useState } from "react";
import { ViewUsers } from "@/requests/viewusers";
import { Clinician } from "@/types/clinician";
import { Patient } from "@/types/patient";
import { Box, Button } from "@mui/material";
import CustomUserList from "@/lists/customUserList";


export default function SeePairsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [clinicians, setClinicians] = useState<Clinician[]>([]);
    const [currentClinicianID, setCurrentClinicianID] = useState<any>(null);
    const [currentPatientID, setCurrentPatientID] = useState<any>(null);

    // Fetch clinicians on load
    useEffect(() => {
        const fetchC = async () => {
        let dataC = await ViewUsers({chooseRole: "CLINICIAN", ofClinicianID: null});
        setClinicians(dataC);
        };
        fetchC();
    }, []);
    
    // Fetch patients on current clinician id change
    useEffect(() => {
        if (currentClinicianID === null) return;
        const fetchP = async () => {
        let dataP = await ViewUsers({chooseRole: null, ofClinicianID: currentClinicianID});
        setPatients(dataP);
        };
        fetchP();
    }, [currentClinicianID]);


    return (
        <div>
            <DashboardLayout>
                <Box sx = {{ display: 'flex', justifyContent: 'space-between', height : '100%'}}>
                    <CustomUserList users={clinicians} setCurrentuserID={setCurrentClinicianID} currentuserID={currentClinicianID} />
                    <CustomUserList users={patients} setCurrentuserID={setCurrentPatientID} currentuserID={currentPatientID} />
                </Box>
            </DashboardLayout>
        </div>
    );
}