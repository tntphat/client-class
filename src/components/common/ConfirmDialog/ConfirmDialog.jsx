import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function ConfirmDialog({ openDialog, setOpenDialog, onClickAction, children, textBtn }) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        style={{ maxWidth: 'unset' }}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          {onClickAction ? (
            <Button onClick={onClickAction} autoFocus>
              {textBtn || 'Agree'}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
