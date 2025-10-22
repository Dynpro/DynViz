import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';

const SetsPopup = ({ open, onClose, onUpdate, defaultName }) => {
  const [setName, setSetName] = useState(defaultName || '');

  const handleUpdate = () => {
    onUpdate(setName);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-set-modal"
      aria-describedby="edit-set-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400,
          borderRadius: 2,
        }}
      >
        <Typography id="edit-set-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit Set
        </Typography>
        <TextField
          fullWidth
          label="Set Name"
          variant="outlined"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SetsPopup;




//  modified by arman khan


