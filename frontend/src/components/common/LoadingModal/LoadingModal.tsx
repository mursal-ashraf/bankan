import { Box, CircularProgress, Modal } from '@mui/material';
import React from 'react';
import { style } from '../AuthModal/utils';

export const LoadingModal: React.FC = () => (
  <Modal open>
    <Box sx={style}>
      <CircularProgress />
    </Box>
  </Modal>
);
