import { useCallback, useState } from 'react';
import {
  AuthError,
  AuthResponse,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { useClient } from '@/contexts/AppContext';

interface SignUpHookResult {
  isLoading: boolean;
  data: AuthResponse['data'] | undefined;
  error: AuthError | undefined | null;
}
export type SignUpHookFunction = (
  credentials: SignUpWithPasswordCredentials,
) => Promise<void>;

export type SignUpHook = () => [SignUpHookFunction, SignUpHookResult];

export const useSignUp: SignUpHook = () => {
  const client = useClient();
  const [result, setResult] = useState<SignUpHookResult>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  const performSignUp = useCallback<SignUpHookFunction>(
    async (credentials: SignUpWithPasswordCredentials) => {
      setResult({ ...result, isLoading: true });
      const { data, error } = await client.auth.signUp(credentials);
      setResult({ ...result, data, error, isLoading: false });
    },
    [client, result],
  );

  return [performSignUp, result];
};
