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

interface IEditCardModalProp {
  card: ICard | undefined;
  isVisible: boolean;
  toggleIsVisible: () => void;
}

export default function EditCardModal({
  card,
  isVisible,
  toggleIsVisible,
}: IEditCardModalProp) {
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={isVisible}
        // onClose={handleClose}
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
              onClick={toggleIsVisible}
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
              defaultValue={card?.title}
            />
            <div className="w-full">
              <DateTimePicker
                label="Deadline"
                defaultValue={dayjs(card?.deadline, 'DD-MM-YYYY HH:mm A')}
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
              defaultValue={card?.description}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggleIsVisible} autoFocus>
            Close
          </Button>
          <Button onClick={toggleIsVisible} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
