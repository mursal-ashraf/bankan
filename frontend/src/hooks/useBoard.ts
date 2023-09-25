import { useTypedSupabaseQuery } from './utils';

const useBoard = (board_id: string) => {
  return useTypedSupabaseQuery((supabase) =>
    supabase
      .from('board')
      .select()
      .eq('id', board_id)
      .order('version', { ascending: true }),
  );
};

export default useBoard;
