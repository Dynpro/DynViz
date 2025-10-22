// // src/@core/components/option-menu/organization/index.js

// import React, { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const OptionsMenu = ({ options, iconButtonProps, iconProps }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton onClick={handleClick} {...iconButtonProps}>
//         <MoreVertIcon {...iconProps} />
//       </IconButton>
//       <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//         {options.map((option, index) => (
//           <MenuItem key={index} onClick={() => { option.onClick(); handleClose(); }}>
//             {option.text}
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };

// export default OptionsMenu;


//  modified by arman khan

// src/@core/components/option-menu/organization/index.js

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const OptionsMenu = ({ options, iconButtonProps, iconProps, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} {...iconButtonProps}>
        <MoreVertIcon {...iconProps} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => { option.onClick(data); handleClose(); }}>
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default OptionsMenu;
