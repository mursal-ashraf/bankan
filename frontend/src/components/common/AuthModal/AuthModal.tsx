import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useLogin, useSignUp } from '@/hooks';
import { loginConfig, signUpConfig, style } from './utils';
import AuthErrorAlert from './AuthErrorAlert';
import LoadingModal from '../LoadingModal';

interface AuthModalProps {
  onClose: () => void;
  onSubmit: () => void;
  isSignUpModal?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onSubmit,
  isSignUpModal = false,
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(isSignUpModal);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const modalConfig = isSignUp ? signUpConfig : loginConfig;

  const [signUp, { isLoading: isSignUpLoading, error: signUpError }] =
    useSignUp();
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLogin();

  const isLoading = isSignUpLoading || isLoginLoading;
  const error = signUpError || loginError;
  const performAuth = isSignUp ? signUp : login;

  const onPrimaryButtonClick = useCallback<() => Promise<void>>(async () => {
    await performAuth({
      email,
      password,
    });
    !error && onSubmit();
  }, [error, onSubmit, email, password, performAuth]);

  if (isLoading) return <LoadingModal />;

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Stack spacing={2}>
          <Typography variant="h3">Welcome to Bankan</Typography>
          {!!error && <AuthErrorAlert {...{ error }} />}
          <TextField
            label="Email address"
            onChange={(e) => setEmail(e?.target?.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e?.target?.value)}
            required
          />
          <Button
            color="primary"
            variant="contained"
            onClick={onPrimaryButtonClick}
          >
            {modalConfig.primaryButtonText}
          </Button>
        </Stack>
        <Typography>{modalConfig.helperText}</Typography>
        <Link onClick={() => setIsSignUp(!isSignUp)}>
          {modalConfig.secondaryButtonText}
        </Link>
      </Box>
    </Modal>
  );
};
