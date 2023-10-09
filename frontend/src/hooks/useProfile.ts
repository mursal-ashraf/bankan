import { useSupabaseQuery, TypedUseSupabaseQuery } from 'supabase-query';
import { Database } from 'schema-v2';

const useProfile = (id: string) => {
  const useTypedSupabaseQuery: TypedUseSupabaseQuery<Database> =
    useSupabaseQuery;

  const queryResult = useTypedSupabaseQuery((supabase) =>
    supabase.from('member').select().eq('id', id),
  );
  return queryResult;
};

export default useProfile;
