import { useTypedSupabaseQuery } from './utils';

const useBoard = (board_id: string) => {
  return useTypedSupabaseQuery(
    (supabase) =>
      supabase
        .from('board')
        .select(
          'id, version, name, created_at, saved_date, team_id, team (id, user_team (user_id, member(*))), user_id, member (id, name, email)',
        )
        .eq('id', board_id)
        .order('version', { ascending: true }),
    { cacheTime: 0 },
  );
};

export default useBoard;
