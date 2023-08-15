import { useClient } from '@/contexts/AppContext';
import { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';

const useUser = () => {
  const client = useClient();
  const [result, setResult] = useState<User | undefined>();

  const performGetUser = useCallback(async () => {
    const user = (await client.auth.getSession()).data.session?.user;
    setResult(user);
  }, [client, result]);

  useEffect(() => {
    performGetUser();
  }, []);

  return result;
};

export const useIsLoggedIn = () => {
  const user = useUser();

  return user?.role === 'authenticated';
};

export default useUser;
