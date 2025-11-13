// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';


// import DashboardCard from '../../../components/cards/DashboardCard';

// const dummyDashboards = [
//   { id: 1, name: 'Dashboard 1' },
//   { id: 2, name: 'Dashboard 2' },
//   { id: 3, name: 'Dashboard 3' },
// ];

// const FolderDetailPage = () => {
//   const router = useRouter();
//   const { projectId, folderId } = router.query;
//   const [dashboards, setDashboards] = useState(dummyDashboards);
//   const [newDashboardName, setNewDashboardName] = useState('');

//   const handleCreateDashboard = () => {
//     if (newDashboardName.trim() !== '') {
//       const newDashboard = {
//         id: dashboards.length + 1,
//         name: newDashboardName.trim(),
//       };
//       setDashboards([...dashboards, newDashboard]);
//       setNewDashboardName('');
//     }
//   };

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Card>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               <input
//                 type="text"
//                 value={newDashboardName}
//                 onChange={(e) => setNewDashboardName(e.target.value)}
//                 placeholder="Enter dashboard name"
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleCreateDashboard}
//               >
//                 Create Dashboard
//               </Button>
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       {dashboards.map((dashboard) => (
//         <Grid item xs={12} sm={6} md={4} key={dashboard.id}>
//           <DashboardCard projectId={projectId} folderId={folderId} dashboard={dashboard} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default FolderDetailPage;





//  changes in dashboard ui


// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import DashboardCard from '../../../components/cards/DashboardCard'; // Adjust path if needed
// import { MdDashboard } from 'react-icons/md';
// import 'react-toastify/dist/ReactToastify.css';

// const getRandomColor = () => {
//   const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// const dummyDashboards = [
//   { id: 1, name: 'Dashboard 1', iconColor: getRandomColor() },
//   { id: 2, name: 'Dashboard 2', iconColor: getRandomColor() },
//   { id: 3, name: 'Dashboard 3', iconColor: getRandomColor() },
// ];

// const FolderDetailPage = () => {
//   const router = useRouter();
//   const { projectId, folderId } = router.query;
//   const [dashboards, setDashboards] = useState(dummyDashboards);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [newDashboardName, setNewDashboardName] = useState('');

//   const handleCreateDashboard = () => {
//     setPopupOpen(true);
//   };

//   const handleSaveDashboard = () => {
//     if (newDashboardName.trim() !== '') {
//       const newDashboard = {
//         id: dashboards.length + 1,
//         name: newDashboardName.trim(),
//         iconColor: getRandomColor(),
//       };
//       setDashboards([...dashboards, newDashboard]);
//       setNewDashboardName('');
//       setPopupOpen(false);
//     }
//   };

//   const handleDashboardClick = (dashboardId) => {
//     router.push(`/project/${projectId}/${folderId}/${dashboardId}`);
//   };

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           sx={{
//             position: 'relative',
//             cursor: 'pointer',
//             '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//           }}
//           onClick={handleCreateDashboard}
//         >
//           <CardContent>
//             <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginBottom: '18px',
//                   width: '42px',
//                   height: '42px',
//                   borderRadius: '50%',
//                   boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                   backgroundColor: 'white',
//                 }}
//               >
//                 <MdDashboard style={{ color: '#1976d2' }} />
//               </div>
//             </Typography>
//             <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//               Create Dashboard
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       {dashboards.map((dashboard) => (
//         <Grid item xs={12} sm={6} md={3} key={dashboard.id}>
//           <DashboardCard
//             dashboard={dashboard}
//             onClick={() => handleDashboardClick(dashboard.id)}
//           />
//         </Grid>
//       ))}
//       {popupOpen && (
//         <Card>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               <input
//                 type="text"
//                 value={newDashboardName}
//                 onChange={(e) => setNewDashboardName(e.target.value)}
//                 placeholder="Enter dashboard name"
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSaveDashboard}
//               >
//                 Save Dashboard
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => setPopupOpen(false)}
//               >
//                 Cancel
//               </Button>
//             </Typography>
//           </CardContent>
//         </Card>
//       )}
//     </Grid>
//   );
// };

// export default FolderDetailPage;



// created modal for dashboard


// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import DashboardCard from '../../../components/cards/DashboardCard'; // Adjust path if needed
// import { MdDashboard } from 'react-icons/md';
// import 'react-toastify/dist/ReactToastify.css';

// const getRandomColor = () => {
//   const colors = [
//     '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', 
//     '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// const dummyDashboards = [
//   { id: 1, name: 'Dashboard 1', iconColor: getRandomColor() },
//   { id: 2, name: 'Dashboard 2', iconColor: getRandomColor() },
//   { id: 3, name: 'Dashboard 3', iconColor: getRandomColor() },
// ];

// const FolderDetailPage = () => {
//   const router = useRouter();
//   const { projectId, folderId } = router.query;
//   const [dashboards, setDashboards] = useState(dummyDashboards);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [newDashboardName, setNewDashboardName] = useState('');

//   const handleCreateDashboard = () => {
//     setPopupOpen(true);
//   };

//   const handleSaveDashboard = () => {
//     if (newDashboardName.trim() !== '') {
//       const newDashboard = {
//         id: dashboards.length + 1,
//         name: newDashboardName.trim(),
//         iconColor: getRandomColor(),
//       };
//       setDashboards([...dashboards, newDashboard]);
//       setNewDashboardName('');
//       setPopupOpen(false);
//     }
//   };

//   const handleDashboardClick = (dashboardId) => {
//     router.push(`/project/${projectId}/${folderId}/${dashboardId}`);
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               position: 'relative',
//               cursor: 'pointer',
//               '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//             }}
//             onClick={handleCreateDashboard}
//           >
//             <CardContent>
//               <Typography
//                 variant="h5"
//                 component="div"
//                 sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '18px',
//                     width: '42px',
//                     height: '42px',
//                     borderRadius: '50%',
//                     boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                     backgroundColor: 'white',
//                   }}
//                 >
//                   <MdDashboard style={{ color: '#1976d2' }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 Create Dashboard
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         {dashboards.map((dashboard) => (
//           <Grid item xs={12} sm={6} md={3} key={dashboard.id}>
//             <DashboardCard
//               dashboard={dashboard}
//               onClick={() => handleDashboardClick(dashboard.id)}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       <Modal
//         open={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
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
//             borderRadius: 1,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Enter Dashboard Name
//           </Typography>
//           <TextField
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             label="Dashboard Name"
//             value={newDashboardName}
//             onChange={(e) => setNewDashboardName(e.target.value)}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSaveDashboard}>
//               Save
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => setPopupOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default FolderDetailPage;



//  blank canvas



// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import DashboardCard from '../../../components/cards/DashboardCard'; // Adjust path if needed
// import { MdDashboard } from 'react-icons/md';
// import 'react-toastify/dist/ReactToastify.css';

// const getRandomColor = () => {
//   const colors = [
//     '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', 
//     '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// const dummyDashboards = [
//   { id: 1, name: 'Dashboard 1', iconColor: getRandomColor() },
//   { id: 2, name: 'Dashboard 2', iconColor: getRandomColor() },
//   { id: 3, name: 'Dashboard 3', iconColor: getRandomColor() },
// ];

// const FolderDetailPage = () => {
//   const router = useRouter();
//   const { projectId, folderId } = router.query;
//   const [dashboards, setDashboards] = useState(dummyDashboards);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [newDashboardName, setNewDashboardName] = useState('');

//   const handleCreateDashboard = () => {
//     setPopupOpen(true);
//   };

//   const handleSaveDashboard = () => {
//     if (newDashboardName.trim() !== '') {
//       const newDashboard = {
//         id: dashboards.length + 1,
//         name: newDashboardName.trim(),
//         iconColor: getRandomColor(),
//       };
//       setDashboards([...dashboards, newDashboard]);
//       setNewDashboardName('');
//       setPopupOpen(false);
//     }
//   };

//   const handleDashboardClick = (dashboardId) => {
//     router.push(`/project/${projectId}/${folderId}/${dashboardId}`);
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               position: 'relative',
//               cursor: 'pointer',
//               '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//             }}
//             onClick={handleCreateDashboard}
//           >
//             <CardContent>
//               <Typography
//                 variant="h5"
//                 component="div"
//                 sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '18px',
//                     width: '42px',
//                     height: '42px',
//                     borderRadius: '50%',
//                     boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                     backgroundColor: 'white',
//                   }}
//                 >
//                   <MdDashboard style={{ color: '#1976d2' }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 Create Dashboard
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         {dashboards.map((dashboard) => (
//           <Grid item xs={12} sm={6} md={3} key={dashboard.id}>
//             <DashboardCard
//               dashboard={dashboard}
//               projectId={projectId}
//               folderId={folderId}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       <Modal
//         open={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
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
//             borderRadius: 1,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Enter Dashboard Name
//           </Typography>
//           <TextField
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             label="Dashboard Name"
//             value={newDashboardName}
//             onChange={(e) => setNewDashboardName(e.target.value)}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSaveDashboard}>
//               Save
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => setPopupOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default FolderDetailPage;





//  binded get all dashboard api



// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import DashboardCard from '../../../components/cards/DashboardCard'; 
// import { MdDashboard } from 'react-icons/md';
// import getAllDashboard from 'src/api/dashboards/getAllDashboard'; 

// const FolderDetailPage = () => {
//   const router = useRouter();
//   const { projectId, folderId } = router.query;
//   const [dashboards, setDashboards] = useState([]);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [newDashboardName, setNewDashboardName] = useState('');

//   useEffect(() => {
//     if (folderId) {
//       // Fetch dashboards when folderId is available
//       const fetchDashboards = async () => {
//         const fetchedDashboards = await getAllDashboard(folderId);
//         setDashboards(fetchedDashboards);
//       };

//       fetchDashboards();
//     }
//   }, [folderId]);

//   const handleCreateDashboard = () => {
//     setPopupOpen(true);
//   };

//   const handleSaveDashboard = () => {
//     if (newDashboardName.trim() !== '') {
//       const newDashboard = {
//         id: dashboards.length + 1,
//         name: newDashboardName.trim(),
//         iconColor: getRandomColor(),
//       };
//       setDashboards([...dashboards, newDashboard]);
//       setNewDashboardName('');
//       setPopupOpen(false);
//     }
//   };

//   const handleDashboardClick = (dashboardId) => {
//     router.push(`/project/${projectId}/${folderId}/${dashboardId}`);
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               position: 'relative',
//               cursor: 'pointer',
//               '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//             }}
//             onClick={handleCreateDashboard}
//           >
//             <CardContent>
//               <Typography
//                 variant="h5"
//                 component="div"
//                 sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '18px',
//                     width: '42px',
//                     height: '42px',
//                     borderRadius: '50%',
//                     boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                     backgroundColor: 'white',
//                   }}
//                 >
//                   <MdDashboard style={{ color: '#1976d2' }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 Create Dashboard
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         {dashboards.map((dashboard) => (
//           <Grid item xs={12} sm={6} md={3} key={dashboard.ID}>
//             <DashboardCard
//               dashboard={dashboard}
//               projectId={projectId}
//               folderId={folderId}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       <Modal
//         open={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
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
//             borderRadius: 1,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Enter Dashboard Name
//           </Typography>
//           <TextField
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             label="Dashboard Name"
//             value={newDashboardName}
//             onChange={(e) => setNewDashboardName(e.target.value)}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSaveDashboard}>
//               Save
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => setPopupOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default FolderDetailPage;






//  binded api to create the project




// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { toast } from 'react-toastify';
// import DashboardCard from '../../../components/cards/DashboardCard'; 
// import { MdDashboard } from 'react-icons/md';
// import getAllDashboard from 'src/api/dashboards/getAllDashboard'; 
// import createDashboard from 'src/api/dashboards/createDashboard'; 

// const FolderDetailPage = () => {
//   const router = useRouter();
//   const { projectId, folderId } = router.query;
//   const [dashboards, setDashboards] = useState([]);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [newDashboardName, setNewDashboardName] = useState('');

//   useEffect(() => {
//     if (folderId) {
//       const fetchDashboards = async () => {
//         const fetchedDashboards = await getAllDashboard(folderId);
//         setDashboards(fetchedDashboards);
//       };

//       fetchDashboards();
//     }
//   }, [folderId]);

//   const handleCreateDashboard = () => {
//     setPopupOpen(true);
//   };

//   const handleSaveDashboard = async () => {
//     if (newDashboardName.trim() !== '') {
//       try {
//         const response = await createDashboard(newDashboardName, folderId, projectId);
        
//         toast.success(response.message); 
        
        
//         const fetchedDashboards = await getAllDashboard(folderId);
//         setDashboards(fetchedDashboards);

//         setNewDashboardName('');
//         setPopupOpen(false);
//       } catch (error) {
//         toast.error('Failed to create dashboard. Please try again.');
//       }
//     }
//   };

//   const handleDashboardClick = (dashboardId) => {
//     router.push(`/project/${projectId}/${folderId}/${dashboardId}`);
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               position: 'relative',
//               cursor: 'pointer',
//               '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//             }}
//             onClick={handleCreateDashboard}
//           >
//             <CardContent>
//               <Typography
//                 variant="h5"
//                 component="div"
//                 sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '18px',
//                     width: '42px',
//                     height: '42px',
//                     borderRadius: '50%',
//                     boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                     backgroundColor: 'white',
//                   }}
//                 >
//                   <MdDashboard style={{ color: '#1976d2' }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 Create Dashboard
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         {dashboards.map((dashboard) => (
//           <Grid item xs={12} sm={6} md={3} key={dashboard.ID}>
//             <DashboardCard
//               dashboard={dashboard}
//               projectId={projectId}
//               folderId={folderId}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       <Modal
//         open={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
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
//             borderRadius: 1,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Enter Dashboard Name
//           </Typography>
//           <TextField
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             label="Dashboard Name"
//             value={newDashboardName}
//             onChange={(e) => setNewDashboardName(e.target.value)}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSaveDashboard}>
//               Save
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => setPopupOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default FolderDetailPage;







// Improved the card ui 




import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import DashboardCard from '../../../components/cards/DashboardCard'; 
import getAllDashboard from 'src/api/dashboards/getAllDashboard'; 
import createDashboard from 'src/api/dashboards/createDashboard'; 
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from 'src/@core/components/page-header';
import { AiOutlinePlus } from 'react-icons/ai';

const FolderDetailPage = () => {
  const router = useRouter();
  const { projectId, folderId } = router.query;
  const [dashboards, setDashboards] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');

  useEffect(() => {
    if (folderId) {
      const fetchDashboards = async () => {
        const fetchedDashboards = await getAllDashboard(folderId);
        setDashboards(fetchedDashboards);
      };

      fetchDashboards();
    }
  }, [folderId]);

  const handleCreateDashboard = async () => {
    if (newDashboardName.trim() !== '') {
      try {
        const response = await createDashboard(newDashboardName, folderId, projectId);
        
        toast.success(response.message); 
        const fetchedDashboards = await getAllDashboard(folderId);
        setDashboards(fetchedDashboards);

        setNewDashboardName('');
        setPopupOpen(false);
      } catch (error) {
        toast.error('Failed to create dashboard. Please try again.');
      }
    }
  };

  return (
    <>
 <Box sx={{ position: 'relative', mb: 6 }}>
<PageHeader
          title={
            <Typography sx={{ mb: 4, fontSize: '1.5rem', fontWeight: 700 }}>
              Dashboard Overview
            </Typography>
          }
          subtitle={
            <Typography sx={{ color: 'text.secondary' }}>
              Manage and view details of all your dashboards. <br />
              Here you can create, update, or delete dashboards as needed.
            </Typography>
          }
        />


      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 6 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setPopupOpen(true)}
        >
          Create Dashboard
        </Button>
      </Box> */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AiOutlinePlus />}
          onClick={() => setPopupOpen(true)}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            borderRadius: '8px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          Create Dashboard
        </Button>
      </Box>

      <Grid container spacing={3}>
        {dashboards.map((dashboard) => (
          <Grid item xs={12} sm={6} md={3} key={dashboard.ID}>
            <DashboardCard
              dashboard={dashboard}
              projectId={projectId}
              folderId={folderId}
              setDashboards={setDashboards}
            />
          </Grid>
        ))}
      </Grid>

      {/* Create Dashboard Modal */}
      <Modal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      >
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
          <Typography variant="h6">Enter Dashboard Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Dashboard Name"
            value={newDashboardName}
            onChange={(e) => setNewDashboardName(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCreateDashboard}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setPopupOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FolderDetailPage;






