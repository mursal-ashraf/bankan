import { LoginHook, useLogin } from '@/hooks/useLogin';
import { SignUpHook, useSignUp } from '@/hooks/useSignUp';

interface AuthModalConfig {
  helperText: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  finishHandler: SignUpHook | LoginHook;
}

export const signUpConfig: AuthModalConfig = {
  helperText: 'If you already have an account please.',
  primaryButtonText: 'Sign up',
  secondaryButtonText: 'Login',
  finishHandler: useSignUp,
};

export const loginConfig: AuthModalConfig = {
  helperText: "If you don't have an account yet you can sign up.",
  primaryButtonText: 'Login',
  secondaryButtonText: 'Register',
  finishHandler: useLogin,
};

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
