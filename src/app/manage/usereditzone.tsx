import { Box, Button, TextField, Typography, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { UpdateUserRequest } from '@/requests/updateuserrequest';

export default function UserEditZone({
    currentUser,
}: {
    currentUser: User | null; 
}) 
{   
    const [formData, setFormData] = useState<User | null>(null);

    //update the form data state whenever currentUser changes
    useEffect(() => {
        if (currentUser) {
            setFormData(currentUser);
            
        } else {
            setFormData(null);
        }
    }, [currentUser]);

    // updates the state for a specific key in the object
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
    
    // Handler for the Save button
    const handleSave = async () => {
        if (formData) {
            setFormData(formData); 
            alert(await UpdateUserRequest(formData) + "reloading to view the changes");
            window.location.reload();
        }
    };

    return (
        <Box sx={{ p: 2, flex: 1}}>
            {formData ? (
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Edit User Data</Typography>

                    <Typography variant="body1">User ID: {formData.userID}</Typography>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Institution"
                        name="institution"
                        value={formData.institution}
                        fullWidth
                        onChange={handleInputChange}
                    />

                    {/* Gender  radiobutton*/}
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={formData?.role}
                            onChange={(e)=> 
                                setFormData({ ...formData, role: e.target.value as "USER" | "CLINICIAN" })}
                        >
                            <FormControlLabel value="USER" control={<Radio />} label="User" />
                            <FormControlLabel value="CLINICIAN" control={<Radio />} label="Clinician" />
    
                        </RadioGroup>
                    </FormControl>
                            
                   
                    <Button sx ={{p:2}}
                     onClick={handleSave}>
                        Save User Data
                    </Button>
                    
                </Box>
            ) : (
                <Typography>Select a user to see details</Typography>
            )}
        </Box>
    );
}