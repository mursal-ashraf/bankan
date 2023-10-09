import { Box, CircularProgress, Modal } from '@mui/material';
import React from 'react';

export const LoadingModal: React.FC = () => (
  <Modal open>
    <Box>
      <CircularProgress />
    </Box>
  </Modal>
);
