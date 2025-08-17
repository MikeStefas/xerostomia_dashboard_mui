'use client';
import { DashboardLayout } from "@toolpad/core";
import { useState, useEffect } from 'react';
import { ViewPatients } from "@/requests/viewpatients";
import { PatientList } from "./patientlist";
import { ReportList } from "./reportlist";
import Box from '@mui/material/Box';
import { Patient } from "@/types/patient";
import { Report } from "@/types/report";
import { ReportViewer } from "./reportviewer";

export default function DashboardPage() {
    const [patients, setPatients] = useState<Patient[]>([]);

    //REPORTS SET ON PATIENT LIST TO NOT USE STATE
    //DIRECTLY PASSES BUTTON KEY (USERID) TO FETCH REQUEST
    const [reports, setReports] = useState<Report[]>([]);  

    const [name, setName] = useState('');
    const [currentReportID, setCurrentReportID] = useState<any>(null);

    const currentReport = reports.find(r => r.id === currentReportID);
    
    // Fetch patients on load
    useEffect(() => {
        const fetchPatients = async () => {
        const data = await ViewPatients();
        setPatients(data);
        };
        fetchPatients();
    }, []);
    



    return (
        <DashboardLayout>
            <Box sx={{ display: 'flex', height: '100%' }}>
                {PatientList(patients, setReports, setName)}
                {ReportList(reports, setCurrentReportID, name)}
                {currentReport && <ReportViewer report={currentReport} />}
            </Box>
            
        </DashboardLayout>
    );
}

