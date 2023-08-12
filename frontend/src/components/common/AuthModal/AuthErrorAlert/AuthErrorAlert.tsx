import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { AuthError } from '@supabase/supabase-js';

interface AuthErrorAlertProps {
  error: AuthError;
}

export const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ error }) => {
  return (
    <Alert severity="error">
      <AlertTitle>{error.name}</AlertTitle>
      {error.message}
    </Alert>
  );
};
