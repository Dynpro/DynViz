
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const TilePopup = ({ open, handleClose, handleAddTiles }) => {
  const [tileCount, setTileCount] = useState('');

  const handleSave = () => {
    if (tileCount) {
      handleAddTiles(Number(tileCount));
      setTileCount('');
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Create Tiles
        </Typography>
        <TextField
          fullWidth
          select
          variant="outlined"
          margin="normal"
          label="Create Tiles"
          value={tileCount}
          onChange={(e) => setTileCount(e.target.value)}
        >
          {[1, 2, 4].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TilePopup;





