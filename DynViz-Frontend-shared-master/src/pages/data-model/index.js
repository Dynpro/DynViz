// modified by arman khan

// // ** Next Import
// import Link from 'next/link'

// // ** MUI Components
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import Avatar from '@mui/material/Avatar'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import OptionsMenu from 'src/@core/components/option-menu'

// const Connections = () => {
//   const data = [
//     {
//       tasks: '834',
//       projects: '18',
//       isConnected: true,
//       connections: '129',
//       name: 'Mark Gilbert',
//       designation: 'UI Designer',
//       avatar: '/images/avatars/1.png',
//       chips: [
//         {
//           title: 'Figma',
//           color: 'secondary'
//         },
//         {
//           title: 'Sketch',
//           color: 'warning'
//         }
//       ]
//     },
//     {
//       tasks: '2.31k',
//       projects: '112',
//       isConnected: false,
//       connections: '1.28k',
//       name: 'Eugenia Parsons',
//       designation: 'Developer',
//       avatar: '/images/avatars/2.png',
//       chips: [
//         {
//           color: 'error',
//           title: 'Angular'
//         },
//         {
//           color: 'info',
//           title: 'React'
//         }
//       ]
//     },
//     {
//       tasks: '1.25k',
//       projects: '32',
//       isConnected: false,
//       connections: '890',
//       name: 'Francis Byrd',
//       designation: 'Developer',
//       avatar: '/images/avatars/3.png',
//       chips: [
//         {
//           title: 'HTML',
//           color: 'primary'
//         },
//         {
//           color: 'info',
//           title: 'React'
//         }
//       ]
//     },
//     {
//       tasks: '12.4k',
//       projects: '86',
//       isConnected: false,
//       connections: '890',
//       name: 'Leon Lucas',
//       designation: 'UI/UX Designer',
//       avatar: '/images/avatars/4.png',
//       chips: [
//         {
//           title: 'Figma',
//           color: 'secondary'
//         },
//         {
//           title: 'Sketch',
//           color: 'warning'
//         },
//         {
//           color: 'primary',
//           title: 'Photoshop'
//         }
//       ]
//     },
//     {
//       tasks: '23.8k',
//       projects: '244',
//       isConnected: true,
//       connections: '2.14k',
//       name: 'Jayden Rogers',
//       designation: 'Full Stack Developer',
//       avatar: '/images/avatars/5.png',
//       chips: [
//         {
//           color: 'info',
//           title: 'React'
//         },
//         {
//           title: 'HTML',
//           color: 'warning'
//         },
//         {
//           color: 'success',
//           title: 'Node.js'
//         }
//       ]
//     },
//     {
//       tasks: '1.28k',
//       projects: '32',
//       isConnected: false,
//       designation: 'SEO',
//       connections: '1.27k',
//       name: 'Jeanette Powell',
//       avatar: '/images/avatars/6.png',
//       chips: [
//         {
//           title: 'Analysis',
//           color: 'secondary'
//         },
//         {
//           color: 'success',
//           title: 'Writing'
//         }
//       ]
//     }
//   ];

//   return (
//     <Box sx={{ px: 3, py: 4 }}>
//       {/* Button Section */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
//       <Link href='/data-model/data-modelling' passHref>
//         <Button variant="contained" startIcon={<Icon icon="bx:plus-circle" />} sx={{ textTransform: 'none' }}>
//           Create Model
//         </Button>
//         </Link>
//       </Box>

//       {/* Cards Section */}
//       <Grid container spacing={6}>
//         {data.map((item, index) => (
//           <Grid key={index} item xs={12} sm={6} md={4}>
//             <Card sx={{ position: 'relative' }}>
//               <OptionsMenu
//                 iconButtonProps={{ size: 'small', sx: { top: 12, right: 12, position: 'absolute' } }}
//                 options={[
//                   'Edit Model',
//                   { divider: true },
//                   { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
//                 ]}
//               />
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
//                   <Avatar src={item.avatar} sx={{ mb: 4, width: 100, height: 100 }} />
//                   <Typography variant='h6' sx={{ fontWeight: 500 }}>
//                     {item.name}
//                   </Typography>
//                   <Typography sx={{ mb: 4, color: 'text.secondary' }}>{item.designation}</Typography>
//                   <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
//                     {item.chips.map((chip, index) => (
//                       <Box
//                         href='/'
//                         key={index}
//                         component={Link}
//                         onClick={e => e.preventDefault()}
//                         sx={{
//                           textDecoration: 'none',
//                           '&:not(:last-of-type)': { mr: 3 },
//                           '& .MuiChip-root': { cursor: 'pointer' }
//                         }}
//                       >
//                         <CustomChip rounded size='small' skin='light' color={chip.color} label={chip.title} />
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Connections;

// changes to make card clickable

// import React from 'react';
// import Link from 'next/link'
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import Avatar from '@mui/material/Avatar'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import Icon from 'src/@core/components/icon'
// import CustomChip from 'src/@core/components/mui/chip'
// import OptionsMenu from 'src/@core/components/option-menu'

// const Connections = () => {
//   const data = [
//     { id: 1, tasks: '834', projects: '18', isConnected: true, connections: '129', name: 'Mark Gilbert', designation: 'UI Designer', avatar: '/images/avatars/1.png', chips: [{ title: 'Figma', color: 'secondary' }, { title: 'Sketch', color: 'warning' }] },
//     { id: 2, tasks: '2.31k', projects: '112', isConnected: false, connections: '1.28k', name: 'Eugenia Parsons', designation: 'Developer', avatar: '/images/avatars/2.png', chips: [{ color: 'error', title: 'Angular' }, { color: 'info', title: 'React' }] },
//     { id: 3, tasks: '1.25k', projects: '32', isConnected: false, connections: '890', name: 'Francis Byrd', designation: 'Developer', avatar: '/images/avatars/3.png', chips: [{ title: 'HTML', color: 'primary' }, { color: 'info', title: 'React' }] },
//     // More data...
//   ];

//   return (
//     <Box sx={{ px: 3, py: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
//         <Link href="/data-model/data-modelling" passHref>
//           <Button variant="contained" startIcon={<Icon icon="bx:plus-circle" />} sx={{ textTransform: 'none' }}>
//             Create Model
//           </Button>
//         </Link>
//       </Box>

//       <Grid container spacing={6}>
//         {data.map(item => (
//           <Grid key={item.id} item xs={12} sm={6} md={4}>
//             <Link href={`/data-model/${item.id}`} passHref>
//               <Card sx={{ position: 'relative', cursor: 'pointer' }}>
//                 <OptionsMenu
//                   iconButtonProps={{ size: 'small', sx: { top: 12, right: 12, position: 'absolute' } }}
//                   options={[
//                     'Edit Model',
//                     { divider: true },
//                     { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
//                   ]}
//                 />
//                 <CardContent>
//                   <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
//                     <Avatar src={item.avatar} sx={{ mb: 4, width: 100, height: 100 }} />
//                     <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                       {item.name}
//                     </Typography>
//                     <Typography sx={{ mb: 4, color: 'text.secondary' }}>{item.designation}</Typography>
//                     <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
//                       {item.chips.map((chip, index) => (
//                         <CustomChip key={index} rounded size="small" skin="light" color={chip.color} label={chip.title} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Connections;

//  changes to make card clickable - 1

// import React from 'react';
// import { useRouter } from 'next/router';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Icon from 'src/@core/components/icon';
// import CustomChip from 'src/@core/components/mui/chip';
// import OptionsMenu from 'src/@core/components/option-menu';

// const Connections = () => {
//   const router = useRouter();

//   const data = [
//     { id: 1, tasks: '834', projects: '18', isConnected: true, connections: '129', name: 'Mark Gilbert', designation: 'UI Designer', avatar: '/images/avatars/data_model.png', chips: [{ title: 'Figma', color: 'secondary' }, { title: 'Sketch', color: 'warning' }] },
//     { id: 2, tasks: '2.31k', projects: '112', isConnected: false, connections: '1.28k', name: 'Eugenia Parsons', designation: 'Developer', avatar: '/images/avatars/data_model.png', chips: [{ color: 'error', title: 'Angular' }, { color: 'info', title: 'React' }] },
//     { id: 3, tasks: '1.25k', projects: '32', isConnected: false, connections: '890', name: 'Francis Byrd', designation: 'Developer', avatar: '/images/avatars/data_model.png', chips: [{ title: 'HTML', color: 'primary' }, { color: 'info', title: 'React' }] },
//     // More data...
//   ];

//   const handleCardClick = (id) => {
//     router.push(`/data-model/${id}`);
//   };

//   return (
//     <Box sx={{ px: 3, py: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
//         <Button
//           variant="contained"
//           startIcon={<Icon icon="bx:plus-circle" />}
//           sx={{ textTransform: 'none' }}
//           onClick={() => router.push('/data-model/data-modelling')}
//         >
//           Create Model
//         </Button>
//       </Box>

//       <Grid container spacing={6}>
//         {data.map(item => (
//           <Grid key={item.id} item xs={12} sm={6} md={4}>
//             <Card
//               sx={{ position: 'relative', cursor: 'pointer' }}
//               onClick={() => handleCardClick(item.id)}
//             >
//               <Box
//                 component="div"
//                 sx={{
//                   position: 'absolute',
//                   top: 12,
//                   right: 12,
//                 }}
//                 onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the card
//               >
//                 <OptionsMenu
//                   iconButtonProps={{ size: 'small' }}
//                   options={[
//                     'Edit Model',
//                     { divider: true },
//                     { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
//                   ]}
//                 />
//               </Box>
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
//                   <Avatar src={item.avatar} sx={{ mb: 4, width: 100, height: 100 }} />
//                   <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                     {item.name}
//                   </Typography>
//                   <Typography sx={{ mb: 4, color: 'text.secondary' }}>{item.designation}</Typography>
//                   <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
//                     {item.chips.map((chip, index) => (
//                       <CustomChip
//                         key={index}
//                         rounded
//                         size="small"
//                         skin="light"
//                         color={chip.color}
//                         label={chip.title}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Connections;

// Api binded to get all sets

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Icon from 'src/@core/components/icon';
// import OptionsMenu from 'src/@core/components/option-menu';
// import getAllSets from 'src/api/sets/getAllSets';

// const Connections = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const setsData = await getAllSets();
//         setData(setsData);
//       } catch (error) {
//         console.error('Failed to fetch connections data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCardClick = (id) => {
//     router.push(`/data-model/${id}`);
//   };

//   if (loading) {
//     return <Typography variant="h6" align="center">Loading...</Typography>;
//   }

//   return (
//     <Box sx={{ px: 3, py: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
//         <Button
//           variant="contained"
//           startIcon={<Icon icon="bx:plus-circle" />}
//           sx={{ textTransform: 'none' }}
//           onClick={() => router.push('/data-model/data-modelling')}
//         >
//           Create Model
//         </Button>
//       </Box>

//       <Grid container spacing={6}>
//         {data.map(item => (
//           <Grid key={item.ID} item xs={12} sm={6} md={4}>
//             <Card
//               sx={{ position: 'relative', cursor: 'pointer' }}
//               onClick={() => handleCardClick(item.ID)}
//             >
//               <Box
//                 component="div"
//                 sx={{
//                   position: 'absolute',
//                   top: 12,
//                   right: 12,
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <OptionsMenu
//                   iconButtonProps={{ size: 'small' }}
//                   options={[
//                     'Edit Model',
//                     { divider: true },
//                     { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
//                   ]}
//                 />
//               </Box>
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
//                   <Avatar src='/images/avatars/data_model.png' sx={{ mb: 4, width: 100, height: 100 }} />
//                   <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                     {item.Name}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Connections;








//  api binded to delete the sets





// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import Avatar from '@mui/material/Avatar'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import Icon from 'src/@core/components/icon'
// import { Menu, MenuItem, IconButton } from '@mui/material'
// import { toast } from 'react-toastify'
// import getAllSets from 'src/api/sets/getAllSets'
// import deleteSet from 'src/api/sets/deleteSets'
// import SetsPopup from 'src/@core/components/sets/setsPopup'

// const Connections = () => {
//   const router = useRouter()
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [selectedSetId, setSelectedSetId] = useState(null)
//   const [isPopupOpen, setIsPopupOpen] = useState(false)
//   const [editSetName, setEditSetName] = useState('')

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const setsData = await getAllSets()
//         setData(setsData)
//       } catch (error) {
//         console.error('Failed to fetch connections data:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleCardClick = id => {
//     router.push(`/data-model/${id}`)
//   }

//   const handleDelete = async () => {
//     if (!selectedSetId) return

//     try {
//       const response = await deleteSet(selectedSetId)
//       if (response.code === 200) {
//         // Remove the deleted item from the frontend
//         setData(prevData => prevData.filter(item => item.ID !== selectedSetId))
//         toast.success('Set Deleted Successfully')
//         setAnchorEl(null) // Close the menu
//       } else {
//         throw new Error('Error in deleting the sets')
//       }
//     } catch (error) {
//       toast.error(error.message || 'Error in deleting the sets')
//     }
//   }

//   const handleMenuClick = (event, id) => {
//     event.stopPropagation() // Prevent card click event when menu button is clicked
//     setAnchorEl(event.currentTarget)
//     setSelectedSetId(id) // Set the ID of the selected set
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//     setSelectedSetId(null) // Clear the selected set ID
//   }

//   const handleEditClick = (id, name) => {
//     setSelectedSetId(id)
//     setEditSetName(name)
//     setIsPopupOpen(true) // Open the popup
//   }

//   const handleUpdateSet = async updatedName => {
//     try {
//       // Update logic goes here
//       // For example, make an API call to update the set's name:
//       // await updateSet(selectedSetId, { name: updatedName });

//       setData(prevData => prevData.map(item => (item.ID === selectedSetId ? { ...item, Name: updatedName } : item)))
//       toast.success('Set updated successfully')
//       setIsPopupOpen(false)
//       setAnchorEl(null) // Close the menu
//     } catch (error) {
//       toast.error('Failed to update set')
//     }
//   }

//   if (loading) {
//     return (
//       <Typography variant='h6' align='center'>
//         Loading...
//       </Typography>
//     )
//   }

//   return (
//     <Box sx={{ px: 3, py: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
//         <Button
//           variant='contained'
//           startIcon={<Icon icon='bx:plus-circle' />}
//           sx={{ textTransform: 'none' }}
//           onClick={() => router.push('/data-model/data-modelling')}
//         >
//           Create Model
//         </Button>
//       </Box>

//       <Grid container spacing={6}>
//         {data.map(item => (
//           <Grid key={item.ID} item xs={12} sm={6} md={4}>
//             <Card
//               sx={{ position: 'relative', cursor: 'pointer' }}
//               onClick={() => handleCardClick(item.ID)} // Card click to redirect
//             >
//               <Box
//                 component='div'
//                 sx={{
//                   position: 'absolute',
//                   top: 12,
//                   right: 12
//                 }}
//               >
//                 <IconButton onClick={e => handleMenuClick(e, item.ID)}>
//                   <Icon icon='bx:dots-vertical-rounded' /> {/* Icon for 3-dot menu */}
//                 </IconButton>
//               </Box>
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
//                   <Avatar src='/images/avatars/data_model.png' sx={{ mb: 4, width: 100, height: 100 }} />
//                   <Typography variant='h6' sx={{ fontWeight: 500 }}>
//                     {item.Name}
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Menu for Delete action */}
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//         <MenuItem onClick={() => handleEditClick(selectedSetId, data.find(item => item.ID === selectedSetId)?.Name)}>
//           Edit
//         </MenuItem>

//         <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
//           Delete
//         </MenuItem>
//       </Menu>


//        {/* SetsPopup Component */}
//     <SetsPopup
//       open={isPopupOpen}
//       onClose={() => setIsPopupOpen(false)}
//       onUpdate={handleUpdateSet}
//       defaultName={editSetName}
//     />
//     </Box>
//   )
// }

// export default Connections





// fixing the popup issue 





import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from 'src/@core/components/icon';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import getAllSets from 'src/api/sets/getAllSets';
import deleteSet from 'src/api/sets/deleteSets';
import SetsPopup from 'src/@core/components/sets/setsPopup';

const Connections = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editSetName, setEditSetName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const setsData = await getAllSets();
        setData(setsData);
      } catch (error) {
        console.error('Failed to fetch connections data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/data-model/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedSetId) return;

    try {
      const response = await deleteSet(selectedSetId);
      if (response.code === 200) {
        setData((prevData) => prevData.filter((item) => item.ID !== selectedSetId));
        toast.success('Set Deleted Successfully');
        setAnchorEl(null);
      } else {
        throw new Error('Error in deleting the sets');
      }
    } catch (error) {
      toast.error(error.message || 'Error in deleting the sets');
    }
  };

  const handleMenuClick = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedSetId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSetId(null);
  };

  const handleEditClick = (id, name) => {
    setSelectedSetId(id);
    setEditSetName(name);
    setIsPopupOpen(true);
    handleMenuClose(); // Ensure dropdown closes when "Edit" is clicked
  };

  const handleUpdateSet = async (updatedName) => {
    try {
      setData((prevData) => prevData.map((item) => (item.ID === selectedSetId ? { ...item, Name: updatedName } : item)));
      toast.success('Set updated successfully');
      setIsPopupOpen(false);
    } catch (error) {
      toast.error('Failed to update set');
    }
  };

  if (loading) {
    return (
      <Typography variant='h6' align='center'>
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button
          variant='contained'
          startIcon={<Icon icon='bx:plus-circle' />}
          sx={{ textTransform: 'none' }}
          onClick={() => router.push('/data-model/data-modelling')}
        >
          Create Model
        </Button>
      </Box>

      <Grid container spacing={6}>
        {data.map((item) => (
          <Grid key={item.ID} item xs={12} sm={6} md={4}>
            <Card
              sx={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => handleCardClick(item.ID)}
            >
              <Box
                component='div'
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                }}
              >
                <IconButton onClick={(e) => handleMenuClick(e, item.ID)}>
                  <Icon icon='bx:dots-vertical-rounded' />
                </IconButton>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Avatar src='/images/avatars/data_model.png' sx={{ mb: 4, width: 100, height: 100 }} />
                  <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    {item.Name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleEditClick(selectedSetId, data.find((item) => item.ID === selectedSetId)?.Name)}>
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>

      <SetsPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onUpdate={handleUpdateSet}
        defaultName={editSetName}
      />
    </Box>
  );
};

export default Connections;




//  binded api to get set by id on "Edit" option click

