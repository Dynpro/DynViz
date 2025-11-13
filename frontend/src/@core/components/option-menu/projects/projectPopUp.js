import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ProjectPopUp = ({ open, onClose, onSave }) => {
  const [projectName, setProjectName] = useState('');

  const handleSave = () => {
    onSave(projectName);
    setProjectName('');
  };

  const handleClose = () => {
    onClose();
    setProjectName('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project Name"
          type="text"
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
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

export default ProjectPopUp;
