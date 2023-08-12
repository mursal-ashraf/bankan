import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';

export const Profile: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        description: ''
    });

    const handleEditClick = () => {
        console.log("Edit button clicked!");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log("Information edited");
    };

    return (
        <div className="absolute inset-0 h-screen w-screen flex items-center justify-center" style={{ backgroundColor: '#FFCD29' }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-4/5 h-4/5">
                <div className="animate-pulse flex h-full">
                    <div className="relative w-1/4 h-1/4 flex flex-col items-center">
                        <div className="w-2/5 h-4/5 rounded-full bg-gray-300 flex items-center justify-center">
                            <AccountCircle style={{ fontSize: '100%', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }}/>
                        </div>
                        <Button 
                            style={{top:"10%", width:"35%"}}
                            variant="contained" 
                            color="primary" 
                            className="w-3/5 mt-2"
                            onClick={handleEditClick}>
                            Edit
                        </Button>
                    </div>
                    <div className="ml-6 flex flex-col justify-between w-3/4 space-y-4">
                        <TextField 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            label="Name"
                            variant="standard"
                            fullWidth
                        />
                        <TextField 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            label="Email"
                            variant="standard"
                            fullWidth
                        />
                        <TextField 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            label="Phone"
                            variant="standard"
                            fullWidth
                        />
                        <TextField 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            label="Address"
                            variant="standard"
                            fullWidth
                        />
                        <TextField 
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            label="Company"
                            variant="standard"
                            fullWidth
                        />
                        <TextField 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            label="Description"
                            variant="standard"
                            fullWidth
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
