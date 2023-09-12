import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';

interface IEditCardModalProp {
  card: Card | null;
  onSaveCardClick: (card: Card) => void;
  onDeleteCardClick: (card: Card) => void;
  isVisible: boolean;
  toggleIsVisible: () => void;
}

export default function EditCardModal({
  card,
  onSaveCardClick,
  onDeleteCardClick,
  isVisible,
  toggleIsVisible,
}: IEditCardModalProp) {
  const [cardToEdit, setCardToEdit] = useState<Card>(card);

  useEffect(() => {
    setCardToEdit(card);
  }, [card]);

  const setTitle = (newTitle: string) => {
    setCardToEdit({ ...cardToEdit.valueOf(), title: newTitle });
  };
  const setDescription = (newDescription: string) => {
    setCardToEdit({ ...cardToEdit.valueOf(), description: newDescription });
  };
  const setDeadline = (newDeadline: string) => {
    setCardToEdit({ ...cardToEdit.valueOf(), deadline: newDeadline });
  };

  return (
    <div>
      <Dialog
        open={isVisible}
        fullWidth={true}
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex flex-row justify-between">
            <p>Edit Card</p>
            <Delete
              style={{ width: 30, height: 30 }}
              className="cursor-pointer"
              color="error"
              onClick={() => {
                toggleIsVisible();
                onDeleteCardClick(cardToEdit);
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-6">
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              fullWidth
              value={cardToEdit?.title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <div className="w-full">
              <DateTimePicker
                label="Deadline"
                value={
                  cardToEdit?.deadline ? dayjs(cardToEdit?.deadline) : null
                }
                onChange={(event) => {
                  setDeadline(event?.format('DD-MM-YYYY HH:mm A') || '');
                }}
                className="w-full"
                format="LLL"
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={cardToEdit?.description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              toggleIsVisible();
            }}
            autoFocus
          >
            Close
          </Button>
          <Button
            onClick={() => {
              toggleIsVisible();
              onSaveCardClick(cardToEdit);
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
