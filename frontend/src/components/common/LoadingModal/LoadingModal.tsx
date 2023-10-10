import { Box, CircularProgress, Modal } from '@mui/material';
import React from 'react';

export const LoadingModal: React.FC = () => (
  <Modal open data-testid="loading-modal">
    <Box>
      <CircularProgress data-testid="circular-progress" />
    </Box>
  </Modal>
);
