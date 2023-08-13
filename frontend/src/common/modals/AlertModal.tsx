import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface AlertModalProps {
  title: string;
  body: string;
  accept: TextAndAction;
  decline: TextAndAction;
}

/**
 *
 * To open, simply render this component. Ensure some condition is used if you do not always want this pop up to be shown.
 * @param title: title text
 * @param body: body text
 * @param accept: accept button text & function to perform on click of accept btn
 * @param decline: decline button text & function to perform on click of decline btn
 *
 */
export default function AlertModal({
  title,
  body,
  accept,
  decline,
}: AlertModalProps) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
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
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={decline.action}>{decline.text}</Button>
          <Button onClick={accept.action} autoFocus>
            {accept.text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
