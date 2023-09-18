import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { MemberIcon } from './MemberIcon';
import { useNavigate, useParams } from 'react-router-dom';
import useBoard from '@/hooks/useBoard';
import { useTypedSupabaseQuery } from '@/hooks/utils';

interface IMemberProp {
  members: Member[];
}

export function MemberBar({ members }: IMemberProp) {
  const { board_id } = useParams() as { board_id: string };
  const navigateTo = useNavigate();

  const { data, isLoading, isError } =
    useBoard(board_id);



  const board = (data || [])[0];
  const team_id = board?.team_id as string;

  const secondQuery = useTypedSupabaseQuery((supabase) => supabase.from('user_team').select('user_id, team_id, member (*)').eq('team_id', team_id));
  const users = secondQuery.data?.map((user_team) => user_team.member);


  if (isLoading || secondQuery.isLoading) return <div>Loading...</div>;
  if (isError || secondQuery.isError) return <div>Error loading board</div>;
  return (
    <>
      <div className="flex flex-row items-center w-full h-16 bg-white m-4 p-2 rounded-md text-black font-bold">
        <p className="mx-2">Members</p>
        {(users || []).map((member) => (
          <div className="mx-1">
            <MemberIcon member={member as any} />
          </div>
        ))}
        <IconButton onClick={() => navigateTo(`/Board/member/${board_id}`)}>
          <AddIcon />
        </IconButton>
      </div>
    </>
  );
}
