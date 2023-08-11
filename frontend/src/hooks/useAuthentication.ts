import { useCallback, useState } from 'react';
import {
  AuthError,
  AuthResponse,
  AuthTokenResponse,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

interface Result {
  isLoading: boolean;
  data: AuthResponse['data'] | undefined;
  error: AuthError | undefined | null;
}

type Credentials =
  | SignUpWithPasswordCredentials
  | SignInWithPasswordCredentials;

type AuthFunctionFromClient = (
  credentials: Credentials
) => Promise<AuthResponse | AuthTokenResponse>;

type AuthHookFunction = (credentials: Credentials) => Promise<void>;
type AuthHook = (
  authFunctionFromClient: AuthFunctionFromClient
) => [AuthHookFunction, Result];

export const useAuthentication: AuthHook = (authFunctionFromClient) => {
  const [result, setResult] = useState<Result>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  const performAuthentication = useCallback<AuthHookFunction>(
    async (credentials: SignUpWithPasswordCredentials) => {
      setResult({ ...result, isLoading: false });
      const { data, error } = await authFunctionFromClient(credentials);
      setResult({ ...result, data, error });
    },
    []
  );

  return [performAuthentication, result];
};
