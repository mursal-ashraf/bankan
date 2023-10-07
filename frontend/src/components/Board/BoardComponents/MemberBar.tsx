import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { MemberIcon } from './MemberIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSupabaseQuery } from '@/hooks/utils';
import { flatten } from 'lodash';

export function MemberBar() {
  const { board_id } = useParams() as { board_id: string };
  const navigateTo = useNavigate();
  const { data, isLoading, isError } = useTypedSupabaseQuery((supabase) =>
    supabase
      .from('board')
      .select(
        'id, version, name, created_at, saved_date, team_id, team (id, user_team (user_id, member(*))), user_id, member (id, name, email)',
      )
      .eq('id', board_id)
      .order('version', { ascending: true }),
  );

  const team_id = data?.find((board) => board.id === board_id)
    ?.team_id as string;

  const users = flatten(
    data
      ?.find((board) => board.id === board_id)
      ?.team?.user_team?.map((user_team) => user_team.member),
  );

  const owner = data?.find((board) => board.id === board_id)?.member as any;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading board</div>;
  return (
    <>
      <div className="flex flex-row items-center w-full h-16 bg-white m-4 p-2 rounded-md text-black font-bold">
        <p className="mx-2">Created by: {owner?.name}</p>
        <p className="mx-2">Members</p>
        {(users || []).map((member) => (
          <div key={member.id} className="mx-1">
            <MemberIcon key={member.id} {...{ member, team_id }} />
          </div>
        ))}
        <IconButton onClick={() => navigateTo(`/Board/member/${board_id}`)}>
          <AddIcon />
        </IconButton>
      </div>
    </>
  );
}
