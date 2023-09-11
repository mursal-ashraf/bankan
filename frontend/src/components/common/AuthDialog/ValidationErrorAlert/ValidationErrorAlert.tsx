import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ValidationErrorAlertProps {
  title?: string;
  message: string;
}

export const ValidationErrorAlert: React.FC<ValidationErrorAlertProps> = ({
  title = 'Incorrect Credentials',
  message,
}) => {
  return (
    <Alert severity="error">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};
