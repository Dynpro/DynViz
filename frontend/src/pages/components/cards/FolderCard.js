// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Link from 'next/link';

// const FolderCard = ({ projectId, folder }) => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h5" component="div">
//           <Link href={`/project/${projectId}/${folder.id}`}>
//             {folder.name}
//           </Link>
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default FolderCard;


// modified by arman khan

// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MdFolderCopy } from 'react-icons/md';

// const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose }) => {
//   const cardColor = folder.id === 'create' ? 'secondary' : 'primary';

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//     >
//       {folder.id === 'create' ? (
//         <CardContent onClick={() => onMenuClick(folder.id)}>
//           <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: '18px',
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '50%',
//                 boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                 backgroundColor: 'white',
//               }}
//             >
//               <MdFolderCopy style={{ color: '#1976d2' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             Create Folder
//           </Typography>
//         </CardContent>
//       ) : (
//         <>
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
//                 <MdFolderCopy style={{ color: folder.iconColor }} />
//               </div>
//             </Typography>
//             <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//               {folder.name}
//             </Typography>
//           </CardContent>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//             onClick={(event) => {
//               event.stopPropagation();
//               onMenuClick(event, folder.id);
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl?.anchor}
//             open={Boolean(anchorEl) && anchorEl.folderId === folder.id}
//             onClose={(e) => {
//               e.stopPropagation();
//               onMenuClose();
//             }}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={onMenuClose}>Edit</MenuItem>
//             <MenuItem onClick={onMenuClose}>Delete</MenuItem>
//           </Menu>
//         </>
//       )}
//     </Card>
//   );
// };

// export default FolderCard;




//  final modified by arman khan

// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MdFolderCopy } from 'react-icons/md';
// import Link from 'next/link';

// const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose }) => {
//   const cardColor = folder.id === 'create' ? 'secondary' : 'primary';

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//     >
//       {folder.id === 'create' ? (
//         <CardContent onClick={() => onMenuClick(folder.id)}>
//           <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: '18px',
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '50%',
//                 boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                 backgroundColor: 'white',
//               }}
//             >
//               <MdFolderCopy style={{ color: '#1976d2' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             Create Folder
//           </Typography>
//         </CardContent>
//       ) : (
//         <>
//           <Link href={`/project/${projectId}/${folder.id}`} passHref>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
//                   <MdFolderCopy style={{ color: folder.iconColor }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 {folder.name}
//               </Typography>
//             </CardContent>
//           </Link>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//             onClick={(event) => {
//               event.stopPropagation();
//               onMenuClick(event, folder.id);
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl?.anchor}
//             open={Boolean(anchorEl) && anchorEl.folderId === folder.id}
//             onClose={(e) => {
//               e.stopPropagation();
//               onMenuClose();
//             }}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={onMenuClose}>Edit</MenuItem>
//             <MenuItem onClick={onMenuClose}>Delete</MenuItem>
//           </Menu>
//         </>
//       )}
//     </Card>
//   );
// };

// export default FolderCard;


//  api binding to get all folders



// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MdFolderCopy } from 'react-icons/md';
// import Link from 'next/link';

// const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose }) => {
//   const cardColor = folder.id === 'create' ? 'secondary' : 'primary';

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//     >
//       {folder.id === 'create' ? (
//         <CardContent onClick={() => onMenuClick(folder.id)}>
//           <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: '18px',
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '50%',
//                 boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                 backgroundColor: 'white',
//               }}
//             >
//               <MdFolderCopy style={{ color: '#1976d2' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             Create Folder
//           </Typography>
//         </CardContent>
//       ) : (
//         <>
//           <Link href={`/project/${projectId}/${folder.id}`} passHref>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
//                   <MdFolderCopy style={{ color: folder.iconColor }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 {folder.name}
//               </Typography>
//             </CardContent>
//           </Link>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//             onClick={(event) => {
//               event.stopPropagation();
//               onMenuClick(event, folder.id);
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl?.anchor}
//             open={Boolean(anchorEl) && anchorEl.folderId === folder.id}
//             onClose={(e) => {
//               e.stopPropagation();
//               onMenuClose();
//             }}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={onMenuClose}>Edit</MenuItem>
//             <MenuItem onClick={onMenuClose}>Delete</MenuItem>
//           </Menu>
//         </>
//       )}
//     </Card>
//   );
// };

// export default FolderCard;



//  api binding to get all folders - version 2


// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MdAdd } from 'react-icons/md'; 
// import { MdFolderCopy } from 'react-icons/md';
// import Link from 'next/link';

// const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose }) => {
//   const cardColor = folder.id === 'create' ? 'secondary' : 'primary';

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//     >
//       {folder.id === 'create' ? (
//         <CardContent onClick={(e) => onMenuClick(e, folder.id)}>
//           <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: '18px',
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '50%',
//                 boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                 backgroundColor: 'white',
//               }}
//             >
//               <MdAdd style={{ color: '#1976d2' }} /> {/* Changed the icon here */}
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             Create Folder
//           </Typography>
//         </CardContent>
//       ) : (
//         <>
//           <Link href={`/project/${projectId}/${folder.id}`} passHref>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
//                   <MdFolderCopy style={{ color: folder.iconColor }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 {folder.name}
//               </Typography>
//             </CardContent>
//           </Link>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//             onClick={(event) => {
//               event.stopPropagation();
//               onMenuClick(event, folder.id);
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl?.anchor}
//             open={Boolean(anchorEl) && anchorEl.folderId === folder.id}
//             onClose={(e) => {
//               e.stopPropagation();
//               onMenuClose();
//             }}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={onMenuClose}>Edit</MenuItem>
//             <MenuItem onClick={onMenuClose}>Delete</MenuItem>
//           </Menu>
//         </>
//       )}
//     </Card>
//   );
// };

// export default FolderCard;




//  modified by arman khan for dev parallel

// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MdAdd } from 'react-icons/md'; 
// import { MdFolderCopy } from 'react-icons/md';
// import Link from 'next/link';

// const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose, onEdit }) => {
//   const cardColor = folder.id === 'create' ? 'secondary' : 'primary';

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//     >
//       {folder.id === 'create' ? (
//         <CardContent onClick={(e) => onMenuClick(e, folder.id)}>
//           <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: '18px',
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '50%',
//                 boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                 backgroundColor: 'white',
//               }}
//             >
//               <MdAdd style={{ color: '#1976d2' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             Create Folder
//           </Typography>
//         </CardContent>
//       ) : (
//         <>
//           <Link href={`/project/${projectId}/${folder.id}`} passHref>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
//                   <MdFolderCopy style={{ color: folder.iconColor }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 {folder.name}
//               </Typography>
//             </CardContent>
//           </Link>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//             onClick={(event) => {
//               event.stopPropagation();
//               onMenuClick(event, folder);
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl?.anchor}
//             open={Boolean(anchorEl) && anchorEl.folder.id === folder.id}
//             onClose={(e) => {
//               e.stopPropagation();
//               onMenuClose();
//             }}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={() => onEdit(folder)}>Edit</MenuItem>
//             <MenuItem onClick={onMenuClose}>Delete</MenuItem>
//           </Menu>
//         </>
//       )}
//     </Card>
//   );
// };

// export default FolderCard;


// modified by arman khan for dev parallel - delete api


// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MdAdd, MdFolderCopy } from 'react-icons/md';
// import Link from 'next/link';

// const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose, onEdit, onDelete }) => {

//   if (!folder) return null;

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//     >
//       {folder.id === 'create' ? (
//         <CardContent onClick={(e) => onMenuClick(e, folder.id)}>
//           <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: '18px',
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '50%',
//                 boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                 backgroundColor: 'white',
//               }}
//             >
//               <MdAdd style={{ color: '#1976d2' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             Create Folder
//           </Typography>
//         </CardContent>
//       ) : (
//         <>
//           <Link href={`/project/${projectId}/${folder.id}`} passHref>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
//                   <MdFolderCopy style={{ color: folder.iconColor }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 {folder.name}
//               </Typography>
//             </CardContent>
//           </Link>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//             onClick={(event) => {
//               event.stopPropagation();
//               onMenuClick(event, folder);
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl?.anchor}
//             open={Boolean(anchorEl) && anchorEl.folder.id === folder.id}
//             onClose={(e) => {
//               e.stopPropagation();
//               onMenuClose();
//             }}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={() => onEdit(folder)}>Edit</MenuItem>
//             <MenuItem onClick={() => onDelete(folder.id)}>Delete</MenuItem>
//           </Menu>
//         </>
//       )}
//     </Card>
//   );
// };

// export default FolderCard;







//  issue fixed while building the code 






// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MdAdd, MdFolderCopy } from 'react-icons/md';
// import Link from 'next/link';

// const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose, onEdit, onDelete }) => {

//   // Ensure folder is defined before rendering
//   if (!folder) return null;

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         cursor: 'pointer',
//         '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
//       }}
//     >
//       {folder.id === 'create' ? (
//         <CardContent onClick={(e) => onMenuClick(e, folder.id)}>
//           <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: '18px',
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '50%',
//                 boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                 backgroundColor: 'white',
//               }}
//             >
//               <MdAdd style={{ color: '#1976d2' }} />
//             </div>
//           </Typography>
//           <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//             Create Folder
//           </Typography>
//         </CardContent>
//       ) : (
//         <>
//           <Link href={`/project/${projectId}/${folder.id}`} passHref>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
//                   <MdFolderCopy style={{ color: folder.iconColor }} />
//                 </div>
//               </Typography>
//               <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
//                 {folder.name}
//               </Typography>
//             </CardContent>
//           </Link>
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//             onClick={(event) => {
//               event.stopPropagation();
//               onMenuClick(event, folder);
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl?.anchor}
//             // Ensure anchorEl and anchorEl.folder are defined before accessing their properties
//             open={Boolean(anchorEl) && anchorEl.folder && anchorEl.folder.id === folder.id}
//             onClose={(e) => {
//               e.stopPropagation();
//               onMenuClose();
//             }}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={() => onEdit(folder)}>Edit</MenuItem>
//             <MenuItem onClick={() => onDelete(folder.id)}>Delete</MenuItem>
//           </Menu>
//         </>
//       )}
//     </Card>
//   );
// };

// export default FolderCard;











//  make create folder card as button




import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MdFolderCopy,  MdEdit, MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { Box, Tooltip, CircularProgress  } from '@mui/material';

const FolderCard = ({ projectId, folder, onMenuClick, anchorEl, onMenuClose, onEdit, onDelete, isLoading = false }) => {
  // Ensure folder is defined before rendering
  if (!folder) return null;

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { 
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          transform: 'translateY(-5px)'
        },
      }}
    >
      <Link href={`/project/${projectId}/${folder.id}`} passHref sx={{ textDecoration: 'none !important' }}>
        <CardContent sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4
        }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              boxShadow: '0 0 0 8px rgba(255, 193, 7, 0.05)',
              mb: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }}
          >
            <MdFolderCopy style={{ color: folder.iconColor, fontSize: '32px' }} />
          </Box>
   
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center', 
              fontWeight: 500,
              color: '#333',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              textDecoration: 'none !important'
            }}
          >
            {folder.name}
          </Typography>
       
        </CardContent>
       
      </Link>
      
      <Tooltip title="Folder Options">
        <IconButton
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)'
            }
          }}
          onClick={(event) => {
            event.stopPropagation();
            onMenuClick(event, folder);
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : <MoreVertIcon />}
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl?.anchor}
        open={Boolean(anchorEl) && anchorEl.folder && anchorEl.folder.id === folder.id}
        onClose={(e) => {
          e.stopPropagation();
          onMenuClose();
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '8px',
            mt: 1,
            minWidth: '120px',
            '& .MuiMenuItem-root': {
              fontSize: '1rem', // Increased font size
              py: 1.5, // Increased padding
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }
          }
        }}
      >
        <MenuItem onClick={() => onEdit(folder)}  sx={{ color: '#1976d2' }}> <MdEdit size={20} /> Edit</MenuItem>
        <MenuItem 
          onClick={() => onDelete(folder.id)}
          sx={{ color: '#f44336' }}
        >
          <MdDelete size={20} /> Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default FolderCard;