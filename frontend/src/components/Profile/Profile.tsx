import React, { useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export const Profile: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        description: ''
    });

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUploadClick = () => {
        setOpen(false);
    };

    return (
        <div className="absolute inset-0 h-screen w-screen flex items-center justify-center" style={{ backgroundColor: '#FFCD29' }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-4/5 h-4/5">
                <div className="flex h-full">
                    <div className="relative w-1/3 h-1/3 flex flex-col items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center">
                    {image ? (
                    <img src={image} alt="Profile" className="w-40 h-40 rounded-full" />
                    ) : (
                        <AccountCircle style={{ width: 160, height: 160 }} />
                        )}
                    </div>
                        <div className="pt-4"></div>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="mt-6 text-xl"
                            style={{padding: '8px 24px'}}
                            onClick={() => setOpen(true)}>
                            Edit
                        </Button>
                    </div>
                    <div className="relative ml-12 flex flex-col w-3/5 space-y-2">
                        <label className="text-2xl font-bold text-black">Name</label>
                        <TextField 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            label="Name"
                            variant="filled"
                            fullWidth
                            InputProps={{style: {fontSize: 20, height: '3rem'}}}
                        />
                        <label className="text-2xl font-bold text-black">Email</label>
                        <TextField 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            label="Email"
                            variant="filled"
                            fullWidth
                            InputProps={{style: {fontSize: 20, height: '3rem'}}}
                                                    />
                        <label className="text-2xl font-bold text-black">Phone Number</label>
                        <TextField 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            label="Phone Number"
                            variant="filled"
                            fullWidth
                            InputProps={{style: {fontSize: 20, height: '3rem'}}}
                                                    />
                        <label className="text-2xl font-bold text-black">Address</label>
                        <TextField 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            label="Address"
                            variant="filled"
                            fullWidth
                            InputProps={{style: {fontSize: 20, height: '3rem'}}}
                        />
                        <label className="text-2xl font-bold text-black">Company</label>
                        <TextField 
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            label="Company"
                            variant="filled"
                            fullWidth
                            InputProps={{style: {fontSize: 20, height: '3rem'}}}
                        />
                        <label className="text-2xl font-bold text-black">Description</label>
                        <TextField 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            label="Description"
                            variant="filled"
                            fullWidth
                            InputProps={{style: {fontSize: 20, height: '3rem'}}}
                        />
                    </div>
                </div>
            </div>
            
            {/* Dialog for image upload */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Upload or Replace Picture</DialogTitle>
                <DialogContent>
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            // Handle the file here if needed
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUploadClick} color="primary">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
