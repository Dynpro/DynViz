// import React, { useState, useEffect } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// const UpdateFolderPopUp = ({ open, onClose, onSave, folder }) => {
//   const [folderName, setFolderName] = useState('');

//   useEffect(() => {
//     if (folder) {
//       setFolderName(folder.name);
//     }
//   }, [folder]);

//   const handleSave = () => {
//     onSave(folder.id, folderName);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//       <DialogTitle id="form-dialog-title">Edit Folder</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Folder Name"
//           fullWidth
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSave} color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateFolderPopUp;



//  modified by arman khan for dev parallel


import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const UpdateFolderPopUp = ({ open, onClose, onSave, folder }) => {
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    if (folder) {
      setFolderName(folder.name);
    }
  }, [folder]);

  const handleSave = () => {
    onSave(folder.id, folderName);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          fullWidth
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFolderPopUp;
