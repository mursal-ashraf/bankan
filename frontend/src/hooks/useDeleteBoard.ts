import { useCallback, useState } from 'react';
import { useClient } from '@/contexts/AppContext';

interface UseDeleteBoardReturn {
  isLoading: boolean;
  error: any;
  success: boolean;
  deleteBoard: (board_id: string) => Promise<void>;
}

const UseDeleteBoard = (): UseDeleteBoardReturn => {
  const client = useClient();

  const [result, setResult] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const deleteBoard = useCallback(
    async (board_id: string) => {
      setIsLoading(true);
      const boards = await client.from('board').delete().eq('id', board_id);
      setIsLoading(false);
      setResult(boards);
    },
    [client],
  );

  return {
    ...result,
    success: result?.status === 204,
    isLoading,
    deleteBoard: async (board_id: string) => await deleteBoard(board_id),
  };
};

export default UseDeleteBoard;
