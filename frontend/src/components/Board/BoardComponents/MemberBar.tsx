import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSupabaseMutation, useTypedSupabaseQuery } from '@/hooks/utils';
import { flatten } from 'lodash';
import { Chip, Stack } from '@mui/material';
import { DarkModeContext } from '@/components/common/navbar/DarkModeContext';
import React from 'react';
import useBoard from '@/hooks/useBoard';

export function MemberBar() {
  const { board_id } = useParams() as { board_id: string };
  const navigateTo = useNavigate();
  const { mutate, error } = useTypedSupabaseMutation({
    onSuccess: () => window.location.reload(),
  });
  // const { data, isLoading, isError } = useTypedSupabaseQuery((supabase) =>
  //   supabase
  //     .from('board')
  //     .select(
  //       'id, version, name, created_at, saved_date, team_id, team (id, user_team (user_id, member(*))), user_id, member (id, name, email)',
  //     )
  //     .eq('id', board_id)
  //     .order('version', { ascending: true }),
  // );
  const { data, isLoading, isError } = useBoard(board_id);

  const team_id = data?.find((board) => board.id === board_id)
    ?.team_id as string;

  const users = flatten(
    data
      ?.find((board) => board.id === board_id)
      ?.team?.user_team?.map((user_team) => user_team.member),
  );

  const owner = data?.find((board) => board.id === board_id)?.member;
  const deleteMember = (id: string) => {
    mutate((supabase) =>
      supabase
        .from('user_team')
        .delete()
        .eq('user_id', id)
        .eq('team_id', team_id),
    );
  };
  const darkModeContext = React.useContext(DarkModeContext);
  if (!darkModeContext)
    throw new Error('Profile must be used within a DarkModeProvider');

  const { darkMode } = darkModeContext;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading board</div>;
  return (
    <div
      className="flex flex-row items-center w-full h-16 bg-white m-4 p-2 rounded-md text-black font-bold"
      style={{ backgroundColor: darkMode ? '#dcdde1' : 'white' }}
    >
      {!!error && <div>Error deleting member</div>}
      <Stack direction="row" spacing={1}>
        <Chip
          label={owner?.name}
          onClick={() => navigateTo(`/Profile/${owner?.id}`)}
        />
        {(users || [])
          .filter(Boolean)
          .map(
            (member) =>
              !!member && (
                <Chip
                  label={member?.name}
                  variant="outlined"
                  onClick={() => navigateTo(`/Profile/${member.id}`)}
                  onDelete={() => deleteMember(member.id)}
                />
              ),
          )}
        <IconButton onClick={() => navigateTo(`/Board/member/${board_id}`)}>
          <AddIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
