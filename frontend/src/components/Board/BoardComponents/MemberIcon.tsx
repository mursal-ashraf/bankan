import { useState } from 'react';
import { Button, Card, CardActions, CardContent, Popover } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

interface IMemberIconProp {
  member: Member;
}

export function MemberIcon({ member }: IMemberIconProp) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <CardContent>
            <div className="flex flex-row w-full">
              <AccountCircle style={{ width: 100, height: '100%' }} />
              <div className="ml-2">
                <p className="font-bold text-lg">@{member.username}</p>
                <p className="text-md">{`${member.given_name} ${member.surname}`}</p>
                <p className="text-md">{member.email}</p>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small">See Profile</Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
}
