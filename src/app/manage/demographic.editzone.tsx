import { Box, Button, TextField, Typography, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { UpdateDemographicRequest } from '@/requests/update.demographic.request';
import { CreateDemographicsRequest } from '@/requests/create.demographics.request';

export default function DemographicEditZone({
    currentUser,
    setEditingMode,
    demographicData,
}: {
    currentUser: User | null; 
    setEditingMode: (editingMode: boolean) => void;
    demographicData: DemographicData | null
}) 
{
    const [formData, setFormData] = useState<DemographicData | null>(null);
    const [isEmpty, setIsEmpty] = useState(false); // to see if we will send a patch or post request!
    

    // updates the state for input 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            if (!prevData) return null;
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    //update the form data state whenever demographic data change
    useEffect(() => {
        if (currentUser) {
            setFormData(demographicData);
            alert(JSON.stringify(demographicData))
            if (formData === null) setIsEmpty(true);//its empty
        } else {
            setFormData(null);
        }
    }, [demographicData]);

    
    // Handler for the Save button
    const handleSave = async () => {
        if (formData) {
            setFormData(formData);
            if(!isEmpty) {
                alert(await UpdateDemographicRequest(formData) + " reloading to view the changes");
            }
            else {
                alert(await CreateDemographicsRequest(
                    { ...formData, userID: currentUser?.userID ?? 0 }
                ) + " reloading to view the changes");
            }
            
            window.location.reload();
        }
    };

    return (
        
        <Box sx={{ p: 2, flex: 1 }}>
            <Divider sx={{ my: 2 }} />
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Demographic Data</Typography>

                        <TextField
                            label="Year of birth"
                            name="yearOfBirth"
                            value={formData?.yearOfBirth ?? ''}
                            fullWidth
                            onChange={handleInputChange}
                        />

                        {/* Gender  radiobutton*/}
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={formData?.gender ?? 'female'}
                                onChange={(e)=> 
                                    setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
        
                            </RadioGroup>
                        </FormControl>


                        <Button sx ={{p:2}}
                         onClick={handleSave}>
                            Save Demographic Data
                        </Button>
                        <Button

                            sx={{ p: 2}}
                            onClick={() => setEditingMode(false)}
                            startIcon={<EditIcon />}
                        >
                            Leave Edit Mode
                        </Button>

                        
                    
                </Box>
           
        </Box>
    );
}