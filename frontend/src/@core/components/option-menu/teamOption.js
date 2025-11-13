import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Icon from 'src/@core/components/icon';

const TeamOption = ({ onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <Icon icon="bx:dots-vertical-rounded" fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          Delete Team
        </MenuItem>
      </Menu>
    </>
  );
};

export default TeamOption;


