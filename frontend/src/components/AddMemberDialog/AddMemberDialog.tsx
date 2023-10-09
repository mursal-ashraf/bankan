import React, { useState } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemText,
  ListItemButton,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Board, Member } from 'schema-v2';
import { useTypedSupabaseMutation } from '@/hooks/utils';
import { Navigate } from 'react-router-dom';

interface AddMemberDialog {
  users: Member[];
  board?: Board;
}

export const AddMemberDialog: React.FC<AddMemberDialog> = ({
  users,
  board,
}) => {
  const team_id = board?.team_id as string;
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<Member[]>([]);
  const {
    mutate,
    isLoading: isPosting,
    isError,
    isSuccess,
  } = useTypedSupabaseMutation();

  const addMembers = () => {
    mutate((supabase) =>
      supabase
        .from('user_team')
        .insert(selectedUsers.map((user) => ({ user_id: user.id, team_id }))),
    );
  };

  if (isSuccess) return <Navigate to={`/Board/${board?.id}`} />;

  return (
    <Dialog open>
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error adding member</AlertTitle>
        </Alert>
      )}
      <DialogTitle id="alert-dialog-title">Add members to board</DialogTitle>
      <DialogContent>
        <TextField
          label="search by email"
          type="email"
          variant="standard"
          margin="normal"
          onChange={(e) => setSearchInput(e.target.value)}
          fullWidth
        />
        {/* show a scrollable list of users */}

        <List>
          {users
            .filter((user) => user.email?.includes(searchInput))
            .map((user) => {
              return (
                <ListItemButton
                  onClick={() => {
                    setSelectedUsers([...selectedUsers, user]);
                  }}
                >
                  <ListItemText primary={user.email} />
                </ListItemButton>
              );
            })}
        </List>
        <Typography>Selected users</Typography>

        <List>
          {selectedUsers.map((user) => {
            return (
              <ListItemButton
                onClick={() => {
                  setSelectedUsers(
                    selectedUsers.filter((u) => u.id !== user.id),
                  );
                }}
              >
                <ListItemText primary={user.email} />
              </ListItemButton>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={isPosting} onClick={addMembers}>
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
