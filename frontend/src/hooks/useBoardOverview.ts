import { Database } from 'schema';
import { useSupabaseQuery, TypedUseSupabaseQuery } from 'supabase-query';
import useUser from './useUser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import supabase from '@/utils/supabase';
import { useClient } from '@/contexts/AppContext';

const fetchBoards = async (user_id: string, client: any) =>
  client.from('board').select().eq('user_id', user_id);

const useBoardOverview = () => {
  const user = useUser();

  const client = useClient();

  const [result, setResult] = useState<any>();

  const performGetBoards = useCallback(
    async (user_id: string) => {
      const boards = await fetchBoards(user_id, client);
      setResult(boards);
    },
    [client],
  );

  useEffect(() => {
    if (user?.id) performGetBoards(user.id);
  }, [performGetBoards, user?.id]);

  return {
    ...result,
    isLoading: !result?.data && !result?.error,
    refetch: performGetBoards,
  };
};

export default useBoardOverview;
