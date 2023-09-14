import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface AlertModalProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  decline: TextAndAction;
  accept?: TextAndAction;
}

/**
 *
 * To open, simply render this component. Ensure some condition is used if you do not always want this pop up to be shown.
 * @param title: title text
 * @param children: body text
 * @param accept: accept button text & function to perform on click of accept btn
 * @param decline: decline button text & function to perform on click of decline btn
 *
 */
export default function AlertModal({
  title,
  children,
  accept,
  decline,
}: AlertModalProps) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    decline.action();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description"> */}
          {children}
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={decline.action}>{decline.text}</Button>
          {accept && (
            <Button onClick={accept.action} autoFocus>
              {accept.text}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
