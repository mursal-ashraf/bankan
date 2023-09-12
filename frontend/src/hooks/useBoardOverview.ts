// import { useClient } from '@/contexts/AppContext';
// import { PostgrestSingleResponse } from '@supabase/supabase-js';
// import { useCallback, useEffect, useState } from 'react';
// import useUser from './useUser';

// const useBoardOverview = () => {
//   const client = useClient();
//   const user = useUser();
//   const [result, setResult] = useState<PostgrestSingleResponse<any>>();

//   const performGetBoards = useCallback(async () => {
//     const board = await client
//       .from('board')
//       .select()
//       .eq('user_id', user?.id)
//       .order('saved_date', { ascending: false });
//     setResult(board);
//   }, [client]);

//   useEffect(() => {
//     performGetBoards();
//   }, [performGetBoards]);

//   return result;
// };

// export default useBoardOverview;

import { Database } from 'schema';
import { useSupabaseQuery, TypedUseSupabaseQuery } from 'supabase-query';
import useUser from './useUser';

const useTypedSupabaseQuery: TypedUseSupabaseQuery<Database> = useSupabaseQuery;

const useBoardOverview = (user_id: string) => {
  return useTypedSupabaseQuery((supabase) =>
    supabase.from('board').select().eq('user_id', user_id),
  );
};

export default useBoardOverview;
