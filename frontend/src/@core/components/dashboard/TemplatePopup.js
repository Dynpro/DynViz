// src/@core/components/dashboard/TemplatePopup.js
// import React from 'react';
// import { Box, Button, Grid, Modal, Typography } from '@mui/material';
// import CardStatsHorizontal from '../card-statistics/card-stats-horizontal/index';
// import templateConfig from 'src/@core/components/cards/templateConfig';

// const TemplatePopup = ({ open, handleClose, handleSave }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '80%',
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 1,
//         }}
//       >
//         <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
//           Select a Card Template
//         </Typography>
//         <Grid container spacing={3}>
//           {templateConfig.map((template) => (
//             <Grid item xs={12} sm={6} md={4} key={template.id}>
//               <CardStatsHorizontal {...template} />
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
//           <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
//             Save
//           </Button>
//           <Button variant="contained" color="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default TemplatePopup;




// level - 1





// TemplatePopup.js

// import React from 'react';
// import { Box, Grid, Modal, Typography, Button } from '@mui/material';
// import CardStatsHorizontal from '../card-statistics/card-stats-horizontal/index';
// import templateConfig from 'src/@core/components/cards/templateConfig';

// const TemplatePopup = ({ open, handleClose, handleAddCard }) => {
//   const handleCardClick = (card) => {
//     handleAddCard(card);
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '80%',
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 1,
//         }}
//       >
//         <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
//           Select a Card Template
//         </Typography>
//         <Grid container spacing={3}>
//           {templateConfig.map((template) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               key={template.id}
//               onClick={() => handleCardClick(template)}
//               sx={{
//                 cursor: 'pointer', // Add pointer cursor to indicate clickability
//               }}
//             >
//               <Box
//                 sx={{
//                   transition: 'transform 0.2s',
//                   '&:hover': {
//                     transform: 'scale(1.05)', // Add hover effect
//                   },
//                 }}
//               >
//                 <CardStatsHorizontal {...template} />
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
//           <Button variant="contained" color="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default TemplatePopup;






