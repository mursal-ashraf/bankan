import React, { useContext } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { AppContext } from '.';
import { Database } from 'schema';

interface AppContext {
  client: SupabaseClient<Database, 'public'> | null;
}

export default React.createContext<AppContext>({ client: null });

export const useClient = () => {
  const { client } = useContext(AppContext);
  if (!client) {
    throw new Error('Must be used inside SupabaseQueryProvider');
  }
  return client;
};
