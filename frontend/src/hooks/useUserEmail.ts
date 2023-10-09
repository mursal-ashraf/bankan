import { useSupabaseQuery, TypedUseSupabaseQuery } from 'supabase-query';
import { Database } from 'schema-v2';

const useUserEmial = (email: string) => {
  const useTypedSupabaseQuery: TypedUseSupabaseQuery<Database> =
    useSupabaseQuery;

  const queryResult = useTypedSupabaseQuery((supabase) =>
    supabase.from('member').select('id').eq('email', email),
  );

  return queryResult;
};

export default useUserEmial;
