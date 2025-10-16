
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
import updateTeam from 'src/api/teams/updateTeam';

const EditTeamPopUp = ({ open, handleClose, users, team, handleUpdateTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (team) {
      setTeamName(team.name || '');
      setSelectedUsers(team.users ? team.users.map(user => user.Name) : []);
    }
  }, [team]);

  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const handleSubmit = async () => {
    if (!team) return;

    const userIds = selectedUsers.map(name => {
      const user = users.find(user => user.Name === name);
      return user.ID;
    });

    const updatedTeam = {
      ...team,
      name: teamName,
      users: selectedUsers.map(name => {
        const user = users.find(user => user.Name === name);
        return { Name: user.Name, Avatar: user.Avatar };
      })
    };

    try {
      const response = await updateTeam(team.id, { Name: teamName, UserID: userIds });
      if (response.code === 206) {
        toast.error(response.message); // Added toast error
      } else {
        toast.success('Team updated successfully'); // Added toast success
        handleUpdateTeam(updatedTeam);
        handleClose();
      }
    } catch (error) {
      toast.error('Failed to update team');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Team</DialogTitle>
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
            value={selectedUsers}
            onChange={handleUserChange}
            input={<OutlinedInput label='Add Users' />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((name) => (
                  <Chip key={name} label={name} />
                ))}
              </Box>
            )}
          >
            {users.map((user) => (
              <MenuItem key={user.ID} value={user.Name}>
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

export default EditTeamPopUp;

