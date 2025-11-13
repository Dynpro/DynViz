import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const WarningSessionOutPopUp = ({ onConfirm, remainingTime }) => {
  const [countdown, setCountdown] = useState(remainingTime);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Session Expiration Warning</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your session is going to expire in{' '}
          <Typography component="span" variant="h6">
            {countdown}
          </Typography>{' '}
          seconds.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" autoFocus>
          OK
        </Button>
        <Button onClick={() => setShowWarning(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningSessionOutPopUp;
