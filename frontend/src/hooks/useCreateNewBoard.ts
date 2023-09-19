import useUser from './useUser';
import { useCallback, useEffect, useState } from 'react';
import { useClient } from '@/contexts/AppContext';

interface UseCreateNewBoardReturn {
  isLoading: boolean;
  error: any;
  success: boolean;
  insertBoard: (boardDetails: boardDetails) => Promise<void>;
}

const UseCreateNewBoard = (): UseCreateNewBoardReturn => {
  const user = useUser();

  const client = useClient();

  const [result, setResult] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const createBoard = useCallback(
    async (user_id: string, boardDetails: boardDetails) => {
      setIsLoading(true);
      const boards = await client
        .from('board')
        .insert({ ...boardDetails, user_id });
      setIsLoading(false);
      setResult(boards);
    },
    [client],
  );

  return {
    ...result,
    success: result?.status === 201,
    isLoading,
    insertBoard: async (boardDetails: boardDetails) =>
      user?.id && (await createBoard(user?.id, boardDetails)),
  };
};

export default UseCreateNewBoard;
