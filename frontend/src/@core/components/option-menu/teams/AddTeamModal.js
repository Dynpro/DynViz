import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { toast } from 'react-toastify';
import createTeam from 'src/api/teams/createTeam';
import getUser from 'src/api/user/getUser';
import 'react-toastify/dist/ReactToastify.css';

const AddTeamModal = ({ open, handleClose, onTeamAdded }) => {
  const [teamName, setTeamName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUser();
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open]);

  const handleUserChange = (event) => {
    setSelectedUserIds(event.target.value);
  };

  const handleSubmit = async () => {
    const teamData = {
      Name: teamName,
      UserID: selectedUserIds
    };

    try {
      const createdTeam = await createTeam(teamData);
      toast.dismiss();
      toast.success('Team created successfully!');
      onTeamAdded(createdTeam);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to create team');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Team</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Team Name'
          type='text'
          fullWidth
          variant='outlined'
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel>Add Users</InputLabel>
          <Select
            multiple
            value={selectedUserIds}
            onChange={handleUserChange}
            input={<OutlinedInput label='Add Users' />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((userId) => {
                  const user = users.find(user => user.ID === userId);
                  return <Chip key={userId} label={user ? user.Name : ''} />;
                })}
              </Box>
            )}
          >
            {users.map((user) => (
              <MenuItem key={user.ID} value={user.ID}>
                {user.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeamModal;




