'use client';
import { List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { Report } from '@/types/report';

export function ReportList(
    { reports, setCurrentReportID, name }: 
    { reports: Report[], setCurrentReportID: (id: number) => void, name: string })
    {
    const [width, setWidth] = useState(400);

    
    return(
    
    <Paper sx = {{width: width, height: '100%', borderRight: '1px solid', borderColor: 'divider'}}>
        <List sx = {{ width: width, overflow: 'auto', height: '100%'}}>

            

            {/* SHRINK BUTTON */}
            { width === 400 ?
            (<ListItemButton onClick={() => setWidth(80)} sx = {{justifyContent: 'space-between'}}>
            Reports List
            <ArrowBackIcon />
            </ListItemButton>)
            :
            (<ListItemButton onClick={() => setWidth(400)} sx = {{justifyContent: 'center'}}>
            <ArrowForwardIcon />
            </ListItemButton>)
            }

            

            {/* NAME AREA*/}
            { width === 400 ?
            (<Typography sx={{ p: 2}}>{name}</Typography>)
            :
            (" ")
            }




            {/* LIST COMPONENTS */}
            {
            width === 400 ? 
            

            
            // DISPLAY reports ONLY IF ITS NOT SHRINKED    
            (reports.length === 0 
                ? 
            (<Typography sx={{ p: 2}}>No reports</Typography>)
                :
            ( 
                reports.map((report) => (
                <ListItemButton key={report.id} onClick={() => setCurrentReportID(report.id)}>
                    <ListItemText
                        primary={new Date(report.createdAt).toLocaleDateString()}
                        secondary={new Date(report.createdAt).toLocaleTimeString()}
                        />
                </ListItemButton>
                
            ))))

            
            :(" ") //RENDER NOTHING IF SHRINKED
            
            }
        </List>
    </Paper>
    );

}

