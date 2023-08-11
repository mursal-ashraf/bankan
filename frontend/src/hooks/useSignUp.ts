import { useClient } from '@/contexts/AppContext';
import { useAuthentication } from './useAuthentication';

export const useSignUp = () => {
  const client = useClient();
  return useAuthentication(client.auth.signUp);
};
