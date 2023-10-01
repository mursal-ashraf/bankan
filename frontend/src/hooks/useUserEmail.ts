import { useEffect } from 'react';
import { useSupabaseQuery, TypedUseSupabaseQuery } from 'supabase-query';
import { Database } from 'schema';
import { useClient } from '@/contexts/AppContext'; // Assuming you have this import for useClient

const useUserEmial = (email: string) => {
  const client = useClient(); // Again, assuming you can use this to get the supabase client
  const useTypedSupabaseQuery: TypedUseSupabaseQuery<Database> =
    useSupabaseQuery;

  const queryResult = useTypedSupabaseQuery((supabase) =>
    supabase.from('member').select('id').eq('email', email),
  );

  return queryResult;
};

export default useUserEmial;
