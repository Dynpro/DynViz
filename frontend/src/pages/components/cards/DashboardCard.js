

//  changes in dashboard ui


// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { MdDashboard } from 'react-icons/md';

// const DashboardCard = ({ dashboard, onClick }) => {
//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//       onClick={onClick}
//     >
//       <CardContent>
//         <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginBottom: '18px',
//               width: '42px',
//               height: '42px',
//               borderRadius: '50%',
//               boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//               backgroundColor: 'white',
//             }}
//           >
//             <MdDashboard style={{ color: dashboard.iconColor }} />
//           </div>
//         </Typography>
//         <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//           {dashboard.name}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default DashboardCard;



//  blank canvas to retain their original size.






// import React from 'react';
// import { useRouter } from 'next/router';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { MdDashboard } from 'react-icons/md';

// const DashboardCard = ({ dashboard, projectId, folderId }) => {
//   const router = useRouter();

//   const handleCardClick = () => {
//     router.push(`/project/${projectId}/${folderId}/${dashboard.id}`);
//   };

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//       onClick={handleCardClick}
//     >
//       <CardContent>
//         <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginBottom: '18px',
//               width: '42px',
//               height: '42px',
//               borderRadius: '50%',
//               boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//               backgroundColor: 'white',
//             }}
//           >
//             <MdDashboard style={{ color: dashboard.iconColor }} />
//           </div>
//         </Typography>
//         <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//           {dashboard.name}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default DashboardCard;





//  issue fixed while building the code 



// import React from 'react';
// import { useRouter } from 'next/router';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { MdDashboard } from 'react-icons/md';

// const DashboardCard = ({ dashboard, projectId, folderId }) => {
//   const router = useRouter();

//   const handleCardClick = () => {
//     router.push(`/project/${projectId}/${folderId}/${dashboard?.id}`); // Ensure dashboard is defined before accessing id
//   };

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//       onClick={handleCardClick}
//     >
//       <CardContent>
//         <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginBottom: '18px',
//               width: '42px',
//               height: '42px',
//               borderRadius: '50%',
//               boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//               backgroundColor: 'white',
//             }}
//           >
//             {/* Ensure dashboard and iconColor are defined before accessing iconColor */}
//             <MdDashboard style={{ color: dashboard?.iconColor || 'defaultColor' }} />
//           </div>
//         </Typography>
//         <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//           {/* Ensure dashboard is defined before accessing name */}
//           {dashboard?.name || 'Default Name'}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default DashboardCard;




//  binded api to get all dashboard



// import React from 'react';
// import { useRouter } from 'next/router';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { MdDashboard } from 'react-icons/md';

// const DashboardCard = ({ dashboard, projectId, folderId }) => {
//   const router = useRouter();

//   const handleCardClick = () => {
//     router.push(`/project/${projectId}/${folderId}/${dashboard.ID}`); 
//   };

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//       onClick={handleCardClick}
//     >
//       <CardContent>
//         <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginBottom: '18px',
//               width: '42px',
//               height: '42px',
//               borderRadius: '50%',
//               boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//               backgroundColor: 'white',
//             }}
//           >
//             <MdDashboard style={{ color: dashboard?.iconColor || 'defaultColor' }} />
//           </div>
//         </Typography>
//         <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//           {dashboard?.Name || 'Default Name'}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default DashboardCard;






//  Improved the card ui





// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { MdDashboard } from 'react-icons/md';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { toast } from 'react-toastify';
// // import updateDashboard from 'src/api/dashboards/updateDashboard';



// // const colorPalette = ['#FF5733', '#33FF57', '#337DFF', '#FF33A1', '#F4C430', '#8E44AD', '#E74C3C', '#27AE60'];


// const colorPalette = [
//   '#FF5733', '#33FF57', '#337DFF', '#FF33A1', '#F4C430', '#8E44AD', 
//   '#E74C3C', '#27AE60', '#1ABC9C', '#D35400', '#C0392B', '#2980B9'
// ];


// const DashboardCard = ({ dashboard, projectId, folderId, setDashboards }) => {
//   const router = useRouter();
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [updatedName, setUpdatedName] = useState(dashboard.Name);
//   const [iconColor, setIconColor] = useState('');

//   // useEffect(() => {
//   //   setIconColor(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
//   // }, []); // Runs only once to ensure a fixed random color


//   useEffect(() => {
//     setIconColor(colorPalette[(Math.floor(Math.random() * colorPalette.length) + Date.now()) % colorPalette.length]);
//   }, []); // Runs only once to assign a unique random color

//   const handleCardClick = () => {
//     router.push(`/project/${projectId}/${folderId}/${dashboard.ID}`);
//   };

//   const handleMenuOpen = (event) => {
//     setMenuAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//   };

//   const handleEditClick = () => {
//     setEditModalOpen(true);
//     handleMenuClose();
//   };

//   const handleUpdateDashboard = async () => {
//     try {
//       await updateDashboard(dashboard.ID, updatedName);
//       toast.success('Dashboard updated successfully');

//       setDashboards((prevDashboards) =>
//         prevDashboards.map((d) => (d.ID === dashboard.ID ? { ...d, Name: updatedName } : d))
//       );

//       setEditModalOpen(false);
//     } catch (error) {
//       toast.error('Failed to update dashboard');
//     }
//   };

//   return (
//     <>
//       <Card
//         sx={{
//           position: 'relative',
//           cursor: 'pointer',
//           borderRadius: 3,
//           transition: '0.3s',
//           background: '#F8F9FA',
//           '&:hover': { transform: 'scale(1.02)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' },
//           padding: '20px',
//         }}
//       >
//         {/* Three-dot menu */}
//         <IconButton
//           sx={{ position: 'absolute', top: 10, right: 10 }}
//           onClick={handleMenuOpen}
//         >
//           <MoreVertIcon />
//         </IconButton>

//         {/* Card Content */}
//         <CardContent onClick={handleCardClick}>
//           <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '50px',
//                 height: '50px',
//                 borderRadius: '50%',
//                 backgroundColor: iconColor,
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//               }}
//             >
//               <MdDashboard style={{ color: 'white', fontSize: '30px' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             {dashboard.Name}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* Menu options */}
//       <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
//         <MenuItem onClick={handleEditClick}>Edit</MenuItem>
//         <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
//       </Menu>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Edit Dashboard
//           </Typography>
//           <TextField
//             fullWidth
//             value={updatedName}
//             onChange={(e) => setUpdatedName(e.target.value)}
//             margin="normal"
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" onClick={handleUpdateDashboard}>
//               Update
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => setEditModalOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default DashboardCard;





//  issue fixed for build - part - 1




// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { MdDashboard } from 'react-icons/md';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { toast } from 'react-toastify';
// import { CircularProgress } from '@mui/material';

// // Ensure colors remain consistent
// const colorPalette = [
//   '#FF5733', '#33FF57', '#337DFF', '#FF33A1', '#F4C430', '#8E44AD', 
//   '#E74C3C', '#27AE60', '#1ABC9C', '#D35400', '#C0392B', '#2980B9'
// ];

// const DashboardCard = ({ dashboard, projectId, folderId, setDashboards }) => {
//   const router = useRouter();
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [updatedName, setUpdatedName] = useState(dashboard?.Name || ''); // Fix: Prevent undefined error
//   const [iconColor, setIconColor] = useState('');

//   // Ensure the component only assigns colors on the client-side
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setIconColor(colorPalette[(Math.floor(Math.random() * colorPalette.length) + Date.now()) % colorPalette.length]);
//     }
//   }, []);

//   const handleCardClick = () => {
//     if (!dashboard) return; // Fix: Prevent navigation error
//     router.push(`/project/${projectId}/${folderId}/${dashboard.ID}`);
//   };

//   const handleMenuOpen = (event) => {
//     setMenuAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//   };

//   const handleEditClick = () => {
//     setEditModalOpen(true);
//     handleMenuClose();
//   };

//   const handleUpdateDashboard = async () => {
//     try {
//       await updateDashboard(dashboard.ID, updatedName);
//       toast.success('Dashboard updated successfully');

//       setDashboards((prevDashboards) =>
//         prevDashboards.map((d) => (d.ID === dashboard.ID ? { ...d, Name: updatedName } : d))
//       );

//       setEditModalOpen(false);
//     } catch (error) {
//       toast.error('Failed to update dashboard');
//     }
//   };

//   if (!dashboard) {
//     return (
//       <Card sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <CircularProgress />
//       </Card>
//     );
//   }

//   return (
//     <>
//       <Card
//         sx={{
//           position: 'relative',
//           cursor: 'pointer',
//           borderRadius: 3,
//           transition: '0.3s',
//           background: '#F8F9FA',
//           '&:hover': { transform: 'scale(1.02)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' },
//           padding: '20px',
//         }}
//       >
//         {/* Three-dot menu */}
//         <IconButton
//           sx={{ position: 'absolute', top: 10, right: 10 }}
//           onClick={handleMenuOpen}
//         >
//           <MoreVertIcon />
//         </IconButton>

//         {/* Card Content */}
//         <CardContent onClick={handleCardClick}>
//           <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '50px',
//                 height: '50px',
//                 borderRadius: '50%',
//                 backgroundColor: iconColor,
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//               }}
//             >
//               <MdDashboard style={{ color: 'white', fontSize: '30px' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             {dashboard.Name}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* Menu options */}
//       <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
//         <MenuItem onClick={handleEditClick}>Edit</MenuItem>
//         <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
//       </Menu>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Edit Dashboard
//           </Typography>
//           <TextField
//             fullWidth
//             value={updatedName}
//             onChange={(e) => setUpdatedName(e.target.value)}
//             margin="normal"
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" onClick={handleUpdateDashboard}>
//               Update
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => setEditModalOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default DashboardCard;






// issue fixed for build - part - 2




// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { MdDashboard } from 'react-icons/md';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { toast } from 'react-toastify';
// import { CircularProgress } from '@mui/material';

// // Ensure colors remain consistent
// const colorPalette = [
//   '#FF5733', '#33FF57', '#337DFF', '#FF33A1', '#F4C430', '#8E44AD', 
//   '#E74C3C', '#27AE60', '#1ABC9C', '#D35400', '#C0392B', '#2980B9'
// ];

// const DashboardCard = ({ dashboard, projectId, folderId, setDashboards }) => {
//   const router = useRouter();
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [updatedName, setUpdatedName] = useState(dashboard?.Name || ''); // Prevent undefined error
//   const [iconColor, setIconColor] = useState('');

//   // Ensure the component only assigns colors on the client-side
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setIconColor(colorPalette[(Math.floor(Math.random() * colorPalette.length) + Date.now()) % colorPalette.length]);
//     }
//   }, []);

//   const handleCardClick = () => {
//     if (!dashboard) return; // Prevent navigation error
//     router.push(`/project/${projectId}/${folderId}/${dashboard.ID}`);
//   };

//   const handleMenuOpen = (event) => {
//     setMenuAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//   };

//   const handleEditClick = () => {
//     setEditModalOpen(true);
//     handleMenuClose();
//   };

//   const handleUpdateDashboard = async () => {
//     try {
//       if (!updatedName.trim()) {
//         toast.error("Dashboard name cannot be empty!");
//         return;
//       }

//       await updateDashboard(dashboard.ID, updatedName);
      
//       toast.success('Dashboard updated successfully' || "Update successful"); // Fix: Ensure a default message

//       setDashboards((prevDashboards) =>
//         prevDashboards.map((d) => (d.ID === dashboard.ID ? { ...d, Name: updatedName } : d))
//       );

//       setEditModalOpen(false);
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error(error.message || "Failed to update dashboard"); // Fix: Ensure a valid error message
//     }
//   };

//   if (!dashboard) {
//     return (
//       <Card sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <CircularProgress />
//       </Card>
//     );
//   }

//   return (
//     <>
//       <Card
//         sx={{
//           position: 'relative',
//           cursor: 'pointer',
//           borderRadius: 3,
//           transition: '0.3s',
//           background: '#F8F9FA',
//           '&:hover': { transform: 'scale(1.02)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' },
//           padding: '20px',
//         }}
//       >
//         {/* Three-dot menu */}
//         <IconButton
//           sx={{ position: 'absolute', top: 10, right: 10 }}
//           onClick={handleMenuOpen}
//         >
//           <MoreVertIcon />
//         </IconButton>

//         {/* Card Content */}
//         <CardContent onClick={handleCardClick}>
//           <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '50px',
//                 height: '50px',
//                 borderRadius: '50%',
//                 backgroundColor: iconColor,
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//               }}
//             >
//               <MdDashboard style={{ color: 'white', fontSize: '30px' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             {dashboard.Name}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* Menu options */}
//       <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
//         <MenuItem onClick={handleEditClick}>Edit</MenuItem>
//         <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
//       </Menu>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Edit Dashboard
//           </Typography>
//           <TextField
//             fullWidth
//             value={updatedName}
//             onChange={(e) => setUpdatedName(e.target.value)}
//             margin="normal"
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" onClick={handleUpdateDashboard}>
//               Update
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => setEditModalOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default DashboardCard;





//  Delete Dashboard Api Binded 


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdDashboard } from 'react-icons/md';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Import the delete dashboard API function
import deleteDashboard from 'src/api/dashboards/deleteDashboard';
// import updateDashboard from 'src/api/dashboards/updateDashboard'; // Assuming you have this file

// Ensure colors remain consistent
const colorPalette = [
  '#FF5733', '#33FF57', '#337DFF', '#FF33A1', '#F4C430', '#8E44AD', 
  '#E74C3C', '#27AE60', '#1ABC9C', '#D35400', '#C0392B', '#2980B9'
];

const DashboardCard = ({ dashboard, projectId, folderId, setDashboards }) => {
  const router = useRouter();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(dashboard?.Name || ''); // Prevent undefined error
  const [iconColor, setIconColor] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Ensure the component only assigns colors on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIconColor(colorPalette[(Math.floor(Math.random() * colorPalette.length) + Date.now()) % colorPalette.length]);
    }
  }, []);

  const handleCardClick = () => {
    if (!dashboard) return; // Prevent navigation error
    router.push(`/project/${projectId}/${folderId}/${dashboard.ID}`);
  };

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // Prevent card click event from firing
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  const handleUpdateDashboard = async () => {
    try {
      if (!updatedName.trim()) {
        toast.error("Dashboard name cannot be empty!");
        return;
      }

      // await updateDashboard(dashboard.ID, updatedName);
      
      toast.success('Dashboard updated successfully');

      setDashboards((prevDashboards) =>
        prevDashboards.map((d) => (d.ID === dashboard.ID ? { ...d, Name: updatedName } : d))
      );

      setEditModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update dashboard");
    }
  };

  const handleDeleteDashboard = async () => {
    try {
      setIsDeleting(true);
      await deleteDashboard(dashboard.ID);
      
      // Update UI by removing the deleted dashboard
      setDashboards((prevDashboards) => 
        prevDashboards.filter((d) => d.ID !== dashboard.ID)
      );
      
      toast.success('Dashboard deleted successfully');
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete dashboard");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!dashboard) {
    return (
      <Card sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          position: 'relative',
          cursor: 'pointer',
          borderRadius: 3,
          transition: '0.3s',
          background: '#F8F9FA',
          '&:hover': { transform: 'scale(1.02)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' },
          padding: '20px',
        }}
      >
        {/* Three-dot menu */}
        <IconButton
          sx={{ position: 'absolute', top: 10, right: 10 }}
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>

        {/* Card Content */}
        <CardContent onClick={handleCardClick}>
          <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: iconColor,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <MdDashboard style={{ color: 'white', fontSize: '30px' }} />
            </div>
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
            {dashboard.Name}
          </Typography>
        </CardContent>
      </Card>

      {/* Menu options */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Dashboard
          </Typography>
          <TextField
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" onClick={handleUpdateDashboard}>
              Update
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => !isDeleting && setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the dashboard "{dashboard.Name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)} 
            color="primary" 
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteDashboard} 
            color="error" 
            variant="contained" 
            autoFocus 
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} color="inherit" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardCard;
