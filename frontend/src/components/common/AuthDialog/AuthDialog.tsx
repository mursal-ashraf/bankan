import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthError } from '@supabase/supabase-js';

import { SignUpHookFunction } from '@/hooks/useSignUp';
import { LoginHookFunction } from '@/hooks/useLogin';
import { Routes } from '@/Router/AppRouter';
import AuthErrorAlert from './AuthErrorAlert';
import { useIsLoggedIn } from '@/hooks';

interface AuthDialogProps {
  title: string;
  submitText: string;
  alternateText: string;
  alternateRoute: string;
  submitRoute: string;
  finishHandler: LoginHookFunction | SignUpHookFunction;
  isLoading: boolean;
  error: AuthError | null | undefined;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({
  title,
  alternateText,
  submitText,
  alternateRoute,
  submitRoute,
  finishHandler,
  error,
  isLoading,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isUserLoggedIn = useIsLoggedIn();
  const navigateTo = useNavigate();

  const onEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setEmail(e.target.value);

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setPassword(e.target.value);

  const onDecline = () => navigateTo(alternateRoute);

  const onSubmit = async () => {
    await finishHandler({ email, password });
    !error && navigateTo(submitRoute);
  };

  if (isUserLoggedIn) return <Navigate to={Routes.Dashboard} />;

  return (
    <Dialog open>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {!!error && <AuthErrorAlert {...{ error }} />}
        <TextField
          label="Email address"
          type="email"
          variant="standard"
          margin="normal"
          fullWidth
          required
          onChange={onEmailChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          margin="normal"
          fullWidth
          required
          onChange={onPasswordChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigateTo(Routes.Home)}>Go back to home</Button>
        <Button onClick={onDecline}>{alternateText}</Button>
        <LoadingButton onClick={onSubmit} loading={isLoading}>
          {submitText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
