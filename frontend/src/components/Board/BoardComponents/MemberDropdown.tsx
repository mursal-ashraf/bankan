import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useTypedSupabaseQuery } from '@/hooks/utils';
import { flatten } from 'lodash';
import { useParams } from 'react-router-dom';
import { Card } from 'schema-v2';

interface MemberDropdownProps {
  card: Card | null;
  onMemberChange?: (e: any) => void;
}

export const MemberDropdown: React.FC<MemberDropdownProps> = ({
  card,
  onMemberChange,
}) => {
  const { board_id } = useParams() as { board_id: string };
  const { data, isLoading, isError } = useTypedSupabaseQuery(
    (supabase) =>
      supabase
        .from('board')
        .select(
          'id, version, name, team_id, team (id, user_team (user_id, member(*))), user_id, member (*)',
        )
        .eq('id', board_id)
        .order('version', { ascending: true }),
    { enabled: !!onMemberChange },
  );

  const users = flatten(
    data
      ?.find((board) => board.id === board_id)
      ?.team?.user_team?.map((user_team) => user_team.member),
  );

  const owner = data?.find((board) => board.id === board_id)?.member;

  const [localUser, setLocalUser] = useState(
    users.find((user) => user?.id === card?.user_assigned),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading board</div>;
  if (!onMemberChange)
    return (
      <p>
        Assigned To:{' '}
        {
          [...users, owner].find((user) => user?.id === card?.user_assigned)
            ?.name
        }
      </p>
    );
  return (
    <FormControl fullWidth>
      <InputLabel id="member-select-label">Assigned to</InputLabel>
      <Select
        labelId="member-select-label"
        id="member-select"
        label="Assigned to"
        value={localUser?.id || ''}
        onChange={(e) => {
          setLocalUser(
            [...users, owner].find((user) => user?.id === e.target.value),
          );
          onMemberChange(e);
        }}
      >
        {[...users, owner].map((user) => {
          return <MenuItem value={user?.id}>{user?.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
