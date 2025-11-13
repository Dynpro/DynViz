
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';

const UserListTeam = ({ open, handleClose, users }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>User List</DialogTitle>
      <DialogContent>
        <List>
          {users.map((user, index) => (
            <ListItem key={index} sx={{ mb: 1, borderRadius: '8px', bgcolor: '#f5f5f5', boxShadow: 1 }}>
              <ListItemAvatar>
                <Avatar src={user.Avatar || "/images/avatars/1.png"} />
              </ListItemAvatar>
              <ListItemText
                primary={<Box component="span" sx={{ fontWeight: 'bold' }}>{user.Name}</Box>}
                secondary={user.Role || "No role specified"}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserListTeam;
