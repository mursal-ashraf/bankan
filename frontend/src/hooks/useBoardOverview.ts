import useUser from './useUser';
import { useCallback, useEffect, useState } from 'react';
import { useClient } from '@/contexts/AppContext';
import { Board } from 'schema-v2';

const fetchBoards = async (user_id: string, client: any) =>
  client.from('board').select().eq('user_id', user_id);

const useBoardOverview = (): fetchReturn<Board[]> => {
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
    isLoading: user?.id && !result?.data && !result?.error,
    refetch: () => user?.id && performGetBoards(user?.id),
  };
};

export default useBoardOverview;
