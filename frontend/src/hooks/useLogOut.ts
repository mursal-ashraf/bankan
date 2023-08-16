import { useState, useCallback } from 'react';
import { AuthError } from '@supabase/supabase-js';
import { useClient } from '@/contexts/AppContext';

interface LogOutResult {
  isLoading: boolean;
  error: AuthError | undefined | null;
}

type LogOutHookFunction = () => Promise<void>;

export type LogOutHook = () => [LogOutHookFunction, LogOutResult];

export const useLogOut: LogOutHook = () => {
  const client = useClient();
  const [result, setResult] = useState<LogOutResult>({
    isLoading: false,
    error: undefined,
  });

  const performLogOut = useCallback<LogOutHookFunction>(async () => {
    setResult({ ...result, isLoading: true });
    const { error } = await client.auth.signOut();
    setResult({ ...result, isLoading: false, error });
  }, [client, result]);

  return [performLogOut, result];
};
