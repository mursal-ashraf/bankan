import { useClient } from '@/contexts/AppContext';
import { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';

const useUser = () => {
  const client = useClient();
  const [result, setResult] = useState<User | undefined>();

  const performGetUser = useCallback(async () => {
    const user = (await client.auth.getSession()).data.session?.user;
    setResult(user);
  }, [client]);

  useEffect(() => {
    performGetUser();
  }, [performGetUser]);

  return result;
};

export default useUser;
