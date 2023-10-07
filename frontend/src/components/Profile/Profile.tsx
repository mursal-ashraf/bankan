import ComponentContainer from '../common/ComponentContainer';
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
} from '@mui/material';
import { AccountCircle, Refresh } from '@mui/icons-material';
import useUser from '@/hooks/useUser';
import { useClient } from '@/contexts/AppContext';
import { UserMetadata } from './userTypes';
import sendEmailNotification from '../common/SendEmailNotification';
import { useParams } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';
import { DarkModeContext } from '../common/navbar/DarkModeContext';

const InnerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const client = useClient();
  const user = useUser();
  const { user_id } = useParams() as { user_id: string };
  const { data, isLoading, isError, refetch, isRefetching } =
    useProfile(user_id);
  const isOwnProfile = user_id === user?.id;
  const [profile] = (data || []).slice(-1);
  const darkModeContext = React.useContext(DarkModeContext);
  if (!darkModeContext) throw new Error("Profile must be used within a DarkModeProvider");

  const { darkMode } = darkModeContext;
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
      expertise: '',
    };
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserMetadata>(defaultFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  const handleUploadClick = async () => {
    if (image) {
      const file = dataURItoBlob(image);
      const filePath = `profile_pictures/${user_id}.jpg`; // This creates a file path like 'profile_pictures/userId.jpg'

      const { data, error } = await client.storage
        .from('User_images')
        .upload(filePath, file);
      if (error) {
        console.error('Failed to upload image:', error);
      } else {
        console.log('Image uploaded successfully:', data);
      }
    }
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      setFormData((previousFormData) => ({
        ...previousFormData,
        name: profile.name || 'Dongyi',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        company: profile.company || '',
        expertise: profile.expertise || '',
      }));
    }
    const fetchImage = async () => {
      const filePath = `profile_pictures/${user_id}.jpg`;
      try {
        const imageUrl = client.storage
          .from('User_images')
          .getPublicUrl(filePath);
        setImage(imageUrl.data.publicUrl);
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    };
    fetchImage();
  }, [profile]);

  const handleSave = async () => {
    const { data: memberData, error: memberError } = await client
      .from('member')
      .update({
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        expertise: formData.expertise,
        company: formData.company,
      })
      .eq('id', user_id);
    if (memberError) {
      console.error('Error updating member table:', memberError);
      setIsEditing(true);
      return;
    }
    if (memberData) {
      console.log('Updated member table');
    }
    const { data: userData, error: userError } = await client.auth.updateUser({
      data: formData,
    });

    if (userData) {
      setIsEditing(false);
      sendEmailNotification(
        formData.email,
        formData.name,
        'Profile Updated',
        'Your profile has been updated',
      );
    }
    if (userError) {
      console.error('Error updating auth.users:', userError);
      setIsEditing(true);
      return;
    }
  };
  return (
    <div
      className="flex justify-center items-center p-4"
      style={{
        backgroundColor: darkMode ? '#192a56' : '#FFCD29',
        flexGrow: 1,
        height: '90vh',
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md flex max-w-5xl w-full overflow-y-auto"
        style={{ backgroundColor: darkMode ? '#dcdde1' : 'white', height: '100%' }}
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

            {user && isOwnProfile && (
              <Button
                variant="contained"
                color="secondary"
                className="mr-2" // Add some right margin for spacing
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            )}
            {(isLoading || isRefetching) && (
              <LinearProgress color="secondary" />
            )}
            {isError && (
              <>
                <LinearProgress
                  variant="determinate"
                  color="error"
                  value={100}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => refetch()}
                >
                  Reload Profile
                  <Refresh className="lr-1" />
                </Button>
              </>
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
          <label className="text-2xl font-bold text-black">Expertise</label>
          <TextField
            name="expertise"
            value={formData.expertise}
            onChange={handleInputChange}
            label="Expertise"
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
