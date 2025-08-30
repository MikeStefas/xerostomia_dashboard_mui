'use client';
import { List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { Patient } from "@/types/patient";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { ViewUserReports } from '@/requests/viewuserreport';

export function PatientList(
    { patients, setReports, setName }: 
    { patients: Patient[], setReports: (reports: any[]) => void, setName: (name: string) => void }) 
    {
    const [width, setWidth] = useState(400);
    const [searchQuery, setSearchQuery] = useState('');



    // Filter the patients based on fullname
    const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return (
        fullName.includes(searchQuery.toLowerCase()) || 
        patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });


    return(
    
    <Paper sx = {{width: width, height: '100%', borderRight: '1px solid', borderColor: 'divider'}}>
        <List sx = {{ width: width, overflow: 'auto', height: '100%'}}>


            {/* SHRINK BUTTON */}
            { width === 400 ?
            (<ListItemButton onClick={() => setWidth(80)} sx = {{justifyContent: 'space-between'}}>
            Patient List
            <ArrowBackIcon />
            </ListItemButton>)
            :
            (<ListItemButton onClick={() => setWidth(400)} sx = {{justifyContent: 'center'}}>
            <ArrowForwardIcon />
            </ListItemButton>)
            }

            {/* SEARCH BAR */}
            
            {width === 400 ? //ONLY IF NOT SHRINKED
            (<ListItem>
            <TextField
            label="Search Patients"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            </ListItem>)
            :
            (" ")
            }
            




            {/* LIST COMPONENTS */}
            {
            width === 400 ? 
            

            // DISPLAY PATIENTS ONLY IF ITS NOT SHRINKED    
            (patients.length === 0 
                ? 
            (<Typography variant="body1">No patients found.</Typography>)
                : //CALL SET REPORTS WITH THE RESULT OF VIEW USER REPORTS
            (filteredPatients.map((patient) => 
                <ListItemButton key={patient.userID} onClick={async () => {setReports(await ViewUserReports(patient.userID)); setName(patient.firstName + " " + patient.lastName);}}>
                <ListItemText primary={patient.lastName + " " + patient.firstName} secondary={"ID: " + patient.userID + ", " + patient.email} />
                </ListItemButton>
                
            )))

            
            :(" ") //RENDER NOTHING IF SHRINKED
            
            }
        </List>
    </Paper>
    );

}

