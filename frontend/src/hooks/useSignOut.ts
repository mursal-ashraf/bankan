import { useCallback, useState } from 'react';
import { AuthError } from '@supabase/supabase-js';
import { useClient } from '@/contexts/AppContext';

interface SignOutHookResult {
  isLoading: boolean;
  error: AuthError | undefined | null;
}
type SignOutHookFunction = () => Promise<void>;

export type SignOutHook = () => [SignOutHookFunction, SignOutHookResult];

export const useSignOut: SignOutHook = () => {
  const client = useClient();
  const [result, setResult] = useState<SignOutHookResult>({
    isLoading: false,
    error: undefined,
  });

  const performSignOut = useCallback<SignOutHookFunction>(async () => {
    setResult({ ...result, isLoading: true });
    const { error } = await client.auth.signOut();
    setResult({ ...result, error, isLoading: false });
  }, [client, result]);

  return [performSignOut, result];
};
