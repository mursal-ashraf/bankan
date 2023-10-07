/* eslint-disable */
import useBoard from '@/hooks/useBoard';
import { useTypedSupabaseQuery } from '@/hooks/utils';
import { Alert, AlertTitle } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Board, Member } from 'schema';

interface WithUsersAndBoardProps {
  users: Member[];
  board?: Board;
}

export const WithUsersAndBoard =
  (Component: React.FC<WithUsersAndBoardProps>) => () => {
    const { board_id } = useParams() as { board_id: string };

    const {
      data: boardData,
      isLoading: isBoardLoading,
      isError: isBoardError,
      error: boardError,
    } = useBoard(board_id);

    const { data, isLoading, isError, error } = useTypedSupabaseQuery(
      (supabase) => supabase.from('member').select('*'),
    );

    if (isBoardLoading) return <div>Loading Board...</div>;
    if (isLoading) return <div>Loading Users...</div>;

    if (isBoardError)
      return (
        <Alert severity="error">
          <AlertTitle>Error loading Board</AlertTitle>
          <>{(boardError as any).message}</>
        </Alert>
      );
    if (isError)
      return (
        <Alert severity="error">
          <AlertTitle>Error loading Users</AlertTitle>
          <>{(error as any).message}</>
        </Alert>
      );

    return <Component users={data || []} board={(boardData || [])[0]} />;
  };
