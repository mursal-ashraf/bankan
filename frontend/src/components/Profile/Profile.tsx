import React, { useState } from 'react';
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
        <div className="absolute inset-0 h-screen w-screen flex items-center justify-center bg-gray-100">
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
                        <input name="name" value={formData.name} onChange={handleInputChange} className="h-20 bg-gray-300 rounded w-3/4 text-xl text-black pl-4" placeholder="Name" />
                        <input name="email" value={formData.email} onChange={handleInputChange} className="h-20 bg-gray-300 rounded w-3/4 text-xl text-black pl-4" placeholder="Email" />
                        <input name="phone" value={formData.phone} onChange={handleInputChange} className="h-20 bg-gray-300 rounded w-3/4 text-xl text-black pl-4" placeholder="Phone" />
                        <input name="address" value={formData.address} onChange={handleInputChange} className="h-20 bg-gray-300 rounded w-3/4 text-xl text-black pl-4" placeholder="Address" />
                        <input name="company" value={formData.company} onChange={handleInputChange} className="h-20 bg-gray-300 rounded w-3/4 text-xl text-black pl-4" placeholder="Company" />
                        <input name="description" value={formData.description} onChange={handleInputChange} className="h-20 bg-gray-300 rounded w-3/4 text-xl text-black pl-4" placeholder="Description" />
                    </div>
                </div>
            </div>
        </div>
    );
};
