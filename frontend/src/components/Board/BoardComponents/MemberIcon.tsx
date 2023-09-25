import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  LinearProgress,
  Popover,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Database } from 'schema';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTypedSupabaseMutation } from '@/hooks/utils';

interface IMemberIconProp {
  member: Database['public']['Tables']['member']['Row'];
  team_id: string;
}

export function MemberIcon({ member, team_id }: IMemberIconProp) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const { mutate, isLoading, error } = useTypedSupabaseMutation({
    onSuccess: () => window.location.reload(),
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteMember = () => {
    mutate((supabase) =>
      supabase
        .from('user_team')
        .delete()
        .eq('user_id', member.id)
        .eq('team_id', team_id),
    );
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer border-2 rounded-lg"
      >
        <AccountCircle style={{ width: 35, height: 35 }} />
      </button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          {isLoading && <LinearProgress color="secondary" />}
          {!!error && <>Error deleting member</>}
          <CardContent>
            <div className="flex flex-row w-full">
              <AccountCircle style={{ width: 100, height: '100%' }} />
              <div className="ml-2">
                <p className="text-md">{`${member.name}`}</p>
                <p className="text-md">{member.email}</p>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small">See Profile</Button>
            <IconButton aria-label="delete" onClick={deleteMember}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
}
