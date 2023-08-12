import { useState, useCallback } from 'react';
import {
  AuthError,
  AuthResponse,
  SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { useClient } from '@/contexts/AppContext';

interface LoginResult {
  isLoading: boolean;
  data: AuthResponse['data'] | undefined;
  error: AuthError | undefined | null;
}

type LoginHookFunction = (
  credentials: SignInWithPasswordCredentials
) => Promise<void>;

export type LoginHook = () => [LoginHookFunction, LoginResult];

export const useLogin: LoginHook = () => {
  const client = useClient();
  const [result, setResult] = useState<LoginResult>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  const performLogin = useCallback<LoginHookFunction>(
    async (credentials: SignInWithPasswordCredentials) => {
      setResult({ ...result, isLoading: false });
      const { data, error } = await client.auth.signInWithPassword(credentials);
      setResult({ ...result, data, error });
    },
    [client, result]
  );

  return [performLogin, result];
};