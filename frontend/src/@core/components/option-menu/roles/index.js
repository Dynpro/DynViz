import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const ManageUsersModal = ({ open, handleClose, selectedUsers, roles, handleRoleChange, handleSave }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Manage Users</DialogTitle>
      <DialogContent>
        <Box>
          {selectedUsers.map(user => (
            <div key={user.id} style={{ marginBottom: '15px' }}>
              <div>{`${user.name} (ID: ${user.id})`}</div>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={user.role}
                  onChange={e => handleRoleChange(e, user.id)}
                >
                  {roles.map(role => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

ManageUsersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedUsers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })).isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleRoleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ManageUsersModal;



//  temporaray change for uac



