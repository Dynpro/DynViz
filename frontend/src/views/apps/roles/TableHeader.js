// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// ** API Import
import getRoles from 'src/api/roles/getRoles';
import getUser from 'src/api/user/getUser';
import manageUAC from 'src/api/uac/manageUAC';

const TableHeader = (props) => {
  // ** Props
  const { plan, handlePlanChange, handleFilter, value, handleSave } = props;

  // ** State
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch roles and users when the component mounts
  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      try {
        const fetchedRoles = await getRoles();
        const fetchedUsers = await getUser();
        console.log("this is my modal user---", fetchedUsers)
        setRoles(fetchedRoles);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching roles or users:', error);
      }
    };

    fetchRolesAndUsers();
  }, []);

  // Handle Modal Open/Close
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  // Handle Role Change
  const handleRoleChange = (event) => setSelectedRole(event.target.value);

  // Handle Select Change for action dropdown
  const handleSelectChange = (event) => {
    const { value } = event.target;
    handlePlanChange(event); // Call parent handler to update state if necessary

    if (value === 'manage-user') {
      handleModalOpen();
    }
  };

  // Handle user selection change in modal
  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  // Handle Save Action
  const handleSaveClick = async () => {
    try {
      await manageUAC(selectedRole, selectedUsers);
      handleSave(); // Call the parent handleSave to update state
      // Close modal after saving
      handleModalClose();
    } catch (error) {
      console.error('Error assigning roles:', error);
    }
  };

  return (
    <Box
      sx={{
        px: 5,
        pb: 2,
        pt: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ mr: 2, color: 'text.secondary' }}>Search</Typography>
        <TextField
          size='small'
          value={value}
          placeholder='Search User'
          sx={{ mr: 4, mb: 2 }}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </Box>
      <FormControl size='small' sx={{ mb: 2 }}>
        <InputLabel id='plan-select'>Select Action</InputLabel>
        <Select
          size='small'
          value={plan}
          id='select-plan'
          label='Select Action'
          labelId='plan-select'
          onChange={handleSelectChange}
          inputProps={{ placeholder: 'Select Plan' }}
        >
          <MenuItem value='manage-user'>Manage User</MenuItem>
          {/* <MenuItem value='delete-user'>Delete User</MenuItem> */}
        </Select>
      </FormControl>

      {/* Modal */}
      <Modal open={open} onClose={handleModalClose}>
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
            Manage Users
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id='role-select-label'>Role</InputLabel>
            <Select
              labelId='role-select-label'
              id='role-select'
              value={selectedRole}
              label='Role'
              onChange={handleRoleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleModalClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleSaveClick}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TableHeader;




