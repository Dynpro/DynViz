import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const FolderPopUp = ({ open, onClose, onSave }) => {
  const [folderName, setFolderName] = useState('');

  const handleSave = () => {
    onSave(folderName);
    setFolderName('');
  };

  const handleClose = () => {
    onClose();
    setFolderName('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          type="text"
          fullWidth
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FolderPopUp;
