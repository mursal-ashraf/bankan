import React from 'react';
import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';

export const Home: React.FC = () => (
    <>
        <h1 className="text-yellow-500">This is BanKan</h1>

        {/* Testing Material UI DELETE WHENEVER */}
        <Button variant="contained">Cool MUI Button</Button><br/>
        <AccessAlarm color="primary"/>
        <ThreeDRotation color="secondary"/>
    </>
);
