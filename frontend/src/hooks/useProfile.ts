import { useEffect } from 'react';
import { useSupabaseQuery, TypedUseSupabaseQuery } from 'supabase-query';
import { Database } from 'schema';
import { useClient } from '@/contexts/AppContext'; // Assuming you have this import for useClient

const useProfile = (id: string) => {
  const client = useClient(); // Again, assuming you can use this to get the supabase client
  const useTypedSupabaseQuery: TypedUseSupabaseQuery<Database> = useSupabaseQuery;

  const queryResult = useTypedSupabaseQuery((supabase) =>
    supabase
      .from('member')
      .select()
      .eq('id', id)
  );

  // useEffect(() => {
  //   const checkMemberExists = async () => {
  //     const { data, error } = await client
  //       .from('member')
  //       .select('id')
  //       .eq('id', id)
  //       .single(); // Use single() to get one row only

  //     if (error) {
  //       console.error('Error checking member table:', error);
  //       return;
  //     }

  //     // If no row exists, create one
  //     if (!data) {
  //       const { data: insertData, error: insertError } = await client
  //         .from('member')
  //         .insert({
  //           id,
  //           name: '',
  //           email: '',
  //           address: '',
  //           company: '',
  //           description: '',
  //           phone: ''
  //         });

  //       if (insertError) {
  //         console.error('Error inserting into member table:', insertError);
  //       }

  //       if (insertData) {
  //         console.log('New row inserted into member table:', insertData);
  //       }
  //     }
  //   };

  //   if (id) {
  //     checkMemberExists();
  //   }
  // }, [id, client]);

  return queryResult;
};

export default useProfile;
