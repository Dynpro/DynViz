// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// ** API Import
import getUser from 'src/api/user/getUser';

const DeleteUACModal = ({ open, onClose, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUser();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection change in modal
  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const handleDelete = () => {
    onDelete(selectedUsers);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
          Delete Users
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id='user-select-label'>Select User</InputLabel>
          <Select
            labelId='user-select-label'
            id='user-select'
            multiple
            value={selectedUsers}
            onChange={handleUserChange}
            renderValue={(selected) =>
              selected.map((id) => {
                const user = users.find((u) => u.ID === id);
                return `${user.Name} - ${user.ID}`;
              }).join(', ')
            }
          >
            {users.map((user) => (
              <MenuItem key={user.ID} value={user.ID}>
                {user.Name} - {user.ID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleDelete}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteUACModal;
