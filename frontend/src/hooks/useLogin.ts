import { useClient } from '@/contexts/AppContext';
import { useAuthentication } from './useAuthentication';

export const useLogin = () => {
  const client = useClient();
  return useAuthentication(client.auth.signInWithPassword);
};
