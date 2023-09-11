import ComponentContainer from '../common/ComponentContainer';
import emailjs from 'emailjs-com';
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import useUser from '@/hooks/useUser';
import { useClient } from '@/contexts/AppContext';
import { UserMetadata } from './userTypes';
import sendEmailNotification from '../common/SendEmailNotification';

const InnerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();
  const client = useClient();

  const defaultFormData: UserMetadata = user
    ? {
      ...(user.user_metadata as UserMetadata),
      email: user.email as string,
    }
    : {
      name: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      description: '',
    };


  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserMetadata>(defaultFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      setFormData((previousFormData) => ({
        ...previousFormData,
        ...(!!user.user_metadata && user.user_metadata),
        ...(!!user.email && { email: user.email }),
      }));
    }
  }, [user]);


  const handleSave = async () => {
    const { data, error } = await client.auth.updateUser({ data: formData });

    if (error) {
      console.error("Error updating user's data:", error);
      setIsEditing(true);
      return;
    }

    if (data) {
      console.log('User updated:', data);
      setIsEditing(false);
      sendEmailNotification(formData.email, formData.name, 'Profile Updated', 'Your profile has been updated');
    }
  };


  return (
    <div
      className="flex justify-center items-center"
      style={{ backgroundColor: '#FFCD29', flexGrow: 1, padding: '50px 0', height: '90vh' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md flex"
        style={{ width: '85%', height: '100%' }}
      >
        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-6">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-40 h-40 rounded-full"
              />
            ) : (
              <AccountCircle style={{ width: 160, height: 160 }} />
            )}
          </div>
          {isEditing && (
            <Button
              variant="contained"
              color="primary"
              className="text-xl mb-6"
              style={{ padding: '8px 24px' }}
              onClick={() => setOpen(true)}
            >
              UPLOAD
            </Button>
          )}
          <div className="flex mt-auto">
            {isEditing && (
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                className="text-xl"
                style={{ marginRight: '10px' }}
              >
                Save
              </Button>
            )}
            {user && (
              <Button
                variant="contained"
                color="secondary"
                className="mr-2" // Add some right margin for spacing
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            )}

          </div>
        </div>
        <div className="relative flex-col justify-center ml-12 w-2/3 space-y-4">
          <label className="text-2xl font-bold text-black">Name</label>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            label="Name"
            variant="filled"
            fullWidth
            disabled={!isEditing}
            InputProps={{ style: { fontSize: 20, height: '3rem' } }}
          />
          <label className="text-2xl font-bold text-black">Email</label>
          <TextField
            name="email"
            value={formData.email}
            label="Email"
            variant="filled"
            fullWidth
            InputProps={{ style: { fontSize: 20, height: '3rem' } }}
            disabled
          />
          <label className="text-2xl font-bold text-black">Phone Number</label>
          <TextField
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            label="Phone Number"
            variant="filled"
            fullWidth
            disabled={!isEditing}
            InputProps={{ style: { fontSize: 20, height: '3rem' } }}
          />
          <label className="text-2xl font-bold text-black">Address</label>
          <TextField
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            label="Address"
            variant="filled"
            fullWidth
            disabled={!isEditing}
            InputProps={{ style: { fontSize: 20, height: '3rem' } }}
          />
          <label className="text-2xl font-bold text-black">Company</label>
          <TextField
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            label="Company"
            variant="filled"
            fullWidth
            disabled={!isEditing}
            InputProps={{ style: { fontSize: 20, height: '3rem' } }}
          />
          <label className="text-2xl font-bold text-black">Description</label>
          <TextField
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            label="Description"
            variant="filled"
            fullWidth
            disabled={!isEditing}
            InputProps={{ style: { fontSize: 20, height: '3rem' } }}
          />
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload or Replace Picture</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
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
export const Profile: React.FC = () => {
  return (
    <ComponentContainer>
      <InnerProfile />
    </ComponentContainer>
  );
};
