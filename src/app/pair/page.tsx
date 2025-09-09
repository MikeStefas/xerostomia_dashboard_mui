'use client';   
import { DashboardLayout } from "@toolpad/core";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ViewUsers } from "@/requests/viewusers";
import { Patient } from "@/types/patient";
import { Clinician } from "@/types/clinician";
import { Button } from "@mui/material";
import { PairClinician } from "@/requests/pairClinician";
import CustomUserList from "@/lists/customUserList";


export default function PairPage() {
    
    const [patients, setPatients] = useState<Patient[]>([]);
    const [clinicians, setClinicians] = useState<Clinician[]>([]);
    const [currentPatientID, setCurrentPatientID] = useState<any>(null);
    const [currentClinicianID, setCurrentClinicianID] = useState<any>(null);

    //const currentReport = reports.find(r => r.id === currentReportID);
    
    // Fetch patients on load
    useEffect(() => {
        const fetchPC = async () => {
        let dataP = await ViewUsers({chooseRole: "USER", ofClinicianID: null});
        setPatients(dataP);
        let dataC = await ViewUsers({chooseRole: "CLINICIAN", ofClinicianID: null});
        setClinicians(dataC);
        };
        fetchPC();
    }, []);
    



    return (
        <DashboardLayout>
            <Box sx={{ 
                display: 'flex', 
                height: '100%', 
                justifyContent:"space-between", 
                alignItems:"center" }}>

                <CustomUserList users={patients} setCurrentuserID={setCurrentPatientID} currentuserID={currentPatientID} />
                
                <Button 
                variant="outlined"
                sx ={{height:"50px"}}
                onClick={async() => {alert(await PairClinician({patientID:currentPatientID,clinicianID:currentClinicianID}))}} 
                >
                    Pair
                </Button>

                <CustomUserList users={clinicians} setCurrentuserID={setCurrentClinicianID} currentuserID={currentClinicianID} />
            </Box>
        </DashboardLayout>
    );
}