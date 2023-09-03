import { useClient } from '@/contexts/AppContext';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';

const useBoard = (board_id: string | undefined) => {
  const client = useClient();
  const [result, setResult] = useState<PostgrestSingleResponse<any>>();

  const performGetBoard = useCallback(async () => {
    const board = await client
      .from('board')
      .select()
      .eq('id', board_id)
      .order('version', { ascending: true });
    setResult(board);
  }, [client]);

  useEffect(() => {
    performGetBoard();
  }, [performGetBoard]);

  return result;
};

export default useBoard;
