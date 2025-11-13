// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// const Filters = () => {
//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4">This is filters</Typography>
//     </Box>
//   );
// };

// export default Filters;



//  modified by arman khan


// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// const Filters = () => {
//   return (
//     <Box
//       sx={{
//         p: 4,
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <Typography variant="h4">Filters</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ textTransform: 'none' }}
//       >
//         Create Filters
//       </Button>
//     </Box>
//   );
// };

// export default Filters;




//  modified by arman khan for create filter button


// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useRouter } from 'next/router';

// const Filters = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const handleCreateFilter = () => {
//     const filterOptionId = '123'; 
//     router.push(`/data-model/${id}/${filterOptionId}`);
//   };

//   return (
//     <Box
//       sx={{
//         p: 4,
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <Typography variant="h4">Filters</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ textTransform: 'none' }}
//         onClick={handleCreateFilter}
//       >
//         Create Filters
//       </Button>
//     </Box>
//   );
// };

// export default Filters;




//  modified by arman khan for card rendering filter






// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Select from '@mui/material/Select';
// import MenuIcon from '@mui/icons-material/MoreVert';
// import { useState } from 'react';
// import { useRouter } from 'next/router';

// // ** Icon Imports
// import Icon from 'src/@core/components/icon';
// // ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar';

// const Filters = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [anchorEl, setAnchorEl] = useState({});
//   const [dropdownValues, setDropdownValues] = useState({});

//   const handleMenuClick = (event, index) => {
//     setAnchorEl((prev) => ({
//       ...prev,
//       [index]: event.currentTarget,
//     }));
//   };

//   const handleMenuClose = (index) => {
//     setAnchorEl((prev) => ({
//       ...prev,
//       [index]: null,
//     }));
//   };

//   const handleDropdownChange = (event, index) => {
//     setDropdownValues((prev) => ({
//       ...prev,
//       [index]: event.target.value,
//     }));
//   };

//   const handleCreateFilter = () => {
//     const filterOptionId = 'create-filter';
//     router.push(`/data-model/${id}/${filterOptionId}`);
//   };

//   return (
//     <Box
//       sx={{
//         p: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 3,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="h4">Filters</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ textTransform: 'none' }}
//           onClick={handleCreateFilter}
//         >
//           Create Filters
//         </Button>
//       </Box>

//       <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
//         {[1, 2, 3].map((card, index) => (
//           <Card key={index}>
//             <CardContent
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 position: 'relative',
//                 padding: 3,
//               }}
//             >
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 8,
//                   right: 8,
//                 }}
//               >
//                 <IconButton onClick={(event) => handleMenuClick(event, index)}>
//                   <MenuIcon />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl[index]}
//                   open={Boolean(anchorEl[index])}
//                   onClose={() => handleMenuClose(index)}
//                 >
//                   <MenuItem onClick={() => console.log('Edit clicked')}>Edit</MenuItem>
//                   <MenuItem onClick={() => console.log('Delete clicked')}>Delete</MenuItem>
//                 </Menu>
//               </Box>

//               <CustomAvatar skin="light" sx={{ width: 50, height: 50, mb: 2.25 }}>
//                 <Icon icon="bx:help-circle" fontSize="2rem" />
//               </CustomAvatar>

//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Card {index + 1}
//               </Typography>
//               <Select
//                 value={dropdownValues[index] || ''}
//                 onChange={(event) => handleDropdownChange(event, index)}
//                 displayEmpty
//                 fullWidth
//                 sx={{ textTransform: 'none' }}
//               >
//                 <MenuItem value="" disabled>
//                   Select a Filter
//                 </MenuItem>
//                 <MenuItem value="filter-1">Filter-1</MenuItem>
//                 <MenuItem value="filter-2">Filter-2</MenuItem>
//                 <MenuItem value="filter-3">Filter-3</MenuItem>
//               </Select>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Filters;





//  binded api to get all filters -  modified by aramn khan


// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Select from '@mui/material/Select';
// import MenuIcon from '@mui/icons-material/MoreVert';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import CircularProgress from '@mui/material/CircularProgress';
// import Alert from '@mui/material/Alert';

// // ** Icon Imports
// import Icon from 'src/@core/components/icon';
// // ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar';
// // ** API Import
// import getAllFiltersBySetID from 'src/api/filter-datamodel/getAllFiltersBySetID';

// const Filters = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [anchorEl, setAnchorEl] = useState({});
//   const [dropdownValues, setDropdownValues] = useState({});
//   const [filters, setFilters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!id) return;
      
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await getAllFiltersBySetID(id);
//         setFilters(response.Data || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilters();
//   }, [id]);

//   const handleMenuClick = (event, index) => {
//     setAnchorEl((prev) => ({
//       ...prev,
//       [index]: event.currentTarget,
//     }));
//   };

//   const handleMenuClose = (index) => {
//     setAnchorEl((prev) => ({
//       ...prev,
//       [index]: null,
//     }));
//   };

//   const handleDropdownChange = (event, index) => {
//     setDropdownValues((prev) => ({
//       ...prev,
//       [index]: event.target.value,
//     }));
//   };

//   const handleCreateFilter = () => {
//     const filterOptionId = 'create-filter';
//     router.push(`/data-model/${id}/${filterOptionId}`);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         p: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 3,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="h4">Filters</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ textTransform: 'none' }}
//           onClick={handleCreateFilter}
//         >
//           Create Filters
//         </Button>
//       </Box>

//       <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
//         {filters.map((filter, index) => (
//           <Card key={filter.ID}>
//             <CardContent
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 position: 'relative',
//                 padding: 3,
//               }}
//             >
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 8,
//                   right: 8,
//                 }}
//               >
//                 <IconButton onClick={(event) => handleMenuClick(event, index)}>
//                   <MenuIcon />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl[index]}
//                   open={Boolean(anchorEl[index])}
//                   onClose={() => handleMenuClose(index)}
//                 >
//                   <MenuItem onClick={() => console.log('Edit clicked', filter.ID)}>Edit</MenuItem>
//                   <MenuItem onClick={() => console.log('Delete clicked', filter.ID)}>Delete</MenuItem>
//                 </Menu>
//               </Box>

//               <CustomAvatar skin="light" sx={{ width: 50, height: 50, mb: 2.25 }}>
//                 <Icon icon="bx:filter" fontSize="2rem" />
//               </CustomAvatar>

//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 {filter.Name}
//               </Typography>
              
//               <Box sx={{ width: '100%', mt: 2 }}>
//                 <Typography variant="caption" color="textSecondary">
//                   Filter ID: {filter.ID}
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
//                   Column ID: {filter.ColumnID}
//                 </Typography>
//               </Box>

//               <Select
//                 value={dropdownValues[index] || ''}
//                 onChange={(event) => handleDropdownChange(event, index)}
//                 displayEmpty
//                 fullWidth
//                 sx={{ textTransform: 'none', mt: 2 }}
//               >
//                 <MenuItem value="" disabled>
//                   Select a Filter
//                 </MenuItem>
//                 <MenuItem value="filter-1">Filter-1</MenuItem>
//                 <MenuItem value="filter-2">Filter-2</MenuItem>
//                 <MenuItem value="filter-3">Filter-3</MenuItem>
//               </Select>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Filters;




//  api binded to get all values in dropdown



// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Select from '@mui/material/Select';
// import MenuIcon from '@mui/icons-material/MoreVert';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import CircularProgress from '@mui/material/CircularProgress';
// import Alert from '@mui/material/Alert';

// // ** Icon Imports
// import Icon from 'src/@core/components/icon';
// // ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar';
// // ** API Imports
// import getAllFiltersBySetID from 'src/api/filter-datamodel/getAllFiltersBySetID';
// import getAllValuesForFilterInModel from 'src/api/filter-datamodel/getAllValuesForFilterInModel';

// const Filters = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [anchorEl, setAnchorEl] = useState({});
//   const [dropdownValues, setDropdownValues] = useState({});
//   const [filters, setFilters] = useState([]);
//   const [filterOptions, setFilterOptions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [loadingOptions, setLoadingOptions] = useState({});

//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!id) return;
      
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await getAllFiltersBySetID(id);


//         if (!response.Data || response.Data.length === 0) {
//           setFilters([]);
//           return;
//         }

//         setFilters(response.Data || []);
        
//         // Fetch dropdown values for each filter
//         const optionsPromises = response.Data.map(async (filter) => {
//           setLoadingOptions(prev => ({ ...prev, [filter.ID]: true }));
//           try {
//             const values = await getAllValuesForFilterInModel(filter.ColumnID);
//             setFilterOptions(prev => ({ ...prev, [filter.ID]: values }));
//           } catch (err) {
//             console.error(`Failed to fetch options for filter ${filter.ID}:`, err);
//             setFilterOptions(prev => ({ ...prev, [filter.ID]: [] }));
//           } finally {
//             setLoadingOptions(prev => ({ ...prev, [filter.ID]: false }));
//           }
//         });

//         await Promise.all(optionsPromises);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilters();
//   }, [id]);

//   const handleMenuClick = (event, index) => {
//     setAnchorEl((prev) => ({
//       ...prev,
//       [index]: event.currentTarget,
//     }));
//   };

//   const handleMenuClose = (index) => {
//     setAnchorEl((prev) => ({
//       ...prev,
//       [index]: null,
//     }));
//   };

//   const handleDropdownChange = (event, filterId) => {
//     setDropdownValues((prev) => ({
//       ...prev,
//       [filterId]: event.target.value,
//     }));
//   };



//   // no filter message- start


//   const NoFiltersMessage = () => (
//     <Box 
//       sx={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '200px',
//         width: '100%',
//         backgroundColor: 'background.paper',
//         borderRadius: 1,
//         p: 3
//       }}
//     >
//       <Typography variant="h6" color="text.secondary">
//         No Filter is present in this Data Model
//       </Typography>
//     </Box>
//   );


//   //  no filter message - end


//   const handleCreateFilter = () => {
//     const filterOptionId = 'create-filter';
//     router.push(`/data-model/${id}/${filterOptionId}`);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         p: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 3,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="h4">Filters</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ textTransform: 'none' }}
//           onClick={handleCreateFilter}
//         >
//           Create Filters
//         </Button>
//       </Box>

//       {filters.length === 0 ? (
//         <NoFiltersMessage />
//       ) : (

//       <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
//         {filters.map((filter, index) => (
//           <Card key={filter.ID}>
//             <CardContent
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 position: 'relative',
//                 padding: 3,
//               }}
//             >
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 8,
//                   right: 8,
//                 }}
//               >
//                 <IconButton onClick={(event) => handleMenuClick(event, index)}>
//                   <MenuIcon />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl[index]}
//                   open={Boolean(anchorEl[index])}
//                   onClose={() => handleMenuClose(index)}
//                 >
//                   <MenuItem onClick={() => console.log('Edit clicked', filter.ID)}>Edit</MenuItem>
//                   <MenuItem onClick={() => console.log('Delete clicked', filter.ID)}>Delete</MenuItem>
//                 </Menu>
//               </Box>

//               <CustomAvatar skin="light" sx={{ width: 50, height: 50, mb: 2.25 }}>
//                 <Icon icon="bx:filter" fontSize="2rem" />
//               </CustomAvatar>

//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 {filter.Name}
//               </Typography>
              
//               <Box sx={{ width: '100%', mt: 2 }}>
//                 <Typography variant="caption" color="textSecondary">
//                   Filter ID: {filter.ID}
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
//                   Column ID: {filter.ColumnID}
//                 </Typography>
//               </Box>

//               <Select
//                 value={dropdownValues[filter.ID] || ''}
//                 onChange={(event) => handleDropdownChange(event, filter.ID)}
//                 displayEmpty
//                 fullWidth
//                 sx={{ textTransform: 'none', mt: 2 }}
//                 disabled={loadingOptions[filter.ID]}
//               >
//                 <MenuItem value="" disabled>
//                   {loadingOptions[filter.ID] ? 'Loading...' : 'Select a value'}
//                 </MenuItem>
//                 {filterOptions[filter.ID]?.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//       )}
//     </Box>
//   );
// };

// export default Filters;





//  Edit Filter - Pop Up



// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Select from '@mui/material/Select';
// import MenuIcon from '@mui/icons-material/MoreVert';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import CircularProgress from '@mui/material/CircularProgress';
// import Alert from '@mui/material/Alert';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';

// // ** Icon Imports
// import Icon from 'src/@core/components/icon';
// // ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar';
// // ** API Imports
// import getAllFiltersBySetID from 'src/api/filter-datamodel/getAllFiltersBySetID';
// import getAllValuesForFilterInModel from 'src/api/filter-datamodel/getAllValuesForFilterInModel';

// const Filters = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [anchorEl, setAnchorEl] = useState({});
//   const [dropdownValues, setDropdownValues] = useState({});
//   const [filters, setFilters] = useState([]);
//   const [filterOptions, setFilterOptions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [loadingOptions, setLoadingOptions] = useState({});

//   // State for Edit Modal
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState(null);
//   const [filterName, setFilterName] = useState('');
//   const [filterQuery, setFilterQuery] = useState('');


//   // handling the dropdown option of 3-dot

//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
//   const [activeMenuId, setActiveMenuId] = useState(null);

//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!id) return;

//       try {
//         setLoading(true);
//         setError(null);
//         const response = await getAllFiltersBySetID(id);

//         if (!response.Data || response.Data.length === 0) {
//           setFilters([]);
//           return;
//         }

//         setFilters(response.Data || []);

//         // Fetch dropdown values for each filter
//         const optionsPromises = response.Data.map(async (filter) => {
//           setLoadingOptions((prev) => ({ ...prev, [filter.ID]: true }));
//           try {
//             const values = await getAllValuesForFilterInModel(filter.ColumnID);
//             setFilterOptions((prev) => ({ ...prev, [filter.ID]: values }));
//           } catch (err) {
//             console.error(`Failed to fetch options for filter ${filter.ID}:`, err);
//             setFilterOptions((prev) => ({ ...prev, [filter.ID]: [] }));
//           } finally {
//             setLoadingOptions((prev) => ({ ...prev, [filter.ID]: false }));
//           }
//         });

//         await Promise.all(optionsPromises);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilters();
//   }, [id]);

//   // const handleMenuClick = (event, index) => {
//   //   event.stopPropagation(); 
//   //   setAnchorEl((prev) => ({
//   //     ...prev,
//   //     [index]: event.currentTarget,
//   //   }));
//   // };

//   // const handleMenuClose = (index) => {
//   //   setAnchorEl((prev) => ({
//   //     ...prev,
//   //     [index]: null,
//   //   }));
//   // };

//   const handleDropdownChange = (event, filterId) => {
//     setDropdownValues((prev) => ({
//       ...prev,
//       [filterId]: event.target.value,
//     }));
//   };

//   // Handle Edit Filter
//   const handleEditFilter = (filter, index) => {
//     setSelectedFilter(filter);
//     setFilterName(filter.Name);
//     setFilterQuery(filter.Query || ''); 
//     setOpenEditModal(true); 
//     handleMenuClose();

//   };

//   // Handle delete filter
//   const handleDeleteFilter = (filterId) => {
//     console.log('Delete clicked', filterId);
//     handleMenuClose();
//   };


//   // Handle Update Filter
//   const handleUpdateFilter = () => {
//     // Add your update logic here (e.g., API call to update the filter)
//     console.log('Updated Filter:', {
//       ...selectedFilter,
//       Name: filterName,
//       Query: filterQuery,
//     });

//     // Close the modal after updating
//     setOpenEditModal(false);
//   };

//   // Handle Cancel Edit
//   const handleCancelEdit = () => {
//     setOpenEditModal(false);
//     setSelectedFilter(null);
//     setFilterName('');
//     setFilterQuery('');
//   };



//   // Handling the menu open and close in 3-dot in filters card- start





//     const handleMenuOpen = (event, filterId) => {
//       event.stopPropagation();
//       setMenuAnchorEl(event.currentTarget);
//       setActiveMenuId(filterId);
//     };
  
//     const handleMenuClose = () => {
//       setMenuAnchorEl(null);
//       setActiveMenuId(null);
//     };


//     // Handling the menu open and close in 3-dot in filters card- end




//   // No filter message
//   const NoFiltersMessage = () => (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '200px',
//         width: '100%',
//         backgroundColor: 'background.paper',
//         borderRadius: 1,
//         p: 3,
//       }}
//     >
//       <Typography variant="h6" color="text.secondary">
//         No Filter is present in this Data Model
//       </Typography>
//     </Box>
//   );

//   const handleCreateFilter = () => {
//     const filterOptionId = 'create-filter';
//     router.push(`/data-model/${id}/${filterOptionId}`);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         p: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 3,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="h4">Filters</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ textTransform: 'none' }}
//           onClick={handleCreateFilter}
//         >
//           Create Filters
//         </Button>
//       </Box>

//       {filters.length === 0 ? (
//         <NoFiltersMessage />
//       ) : (
//         <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
//           {filters.map((filter, index) => (
//             <Card key={filter.ID}>
//               <CardContent
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   position: 'relative',
//                   padding: 3,
//                 }}
//               >
//         <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
//           <IconButton 
//             onClick={(e) => handleMenuOpen(e, filter.ID)}
//             aria-label="actions"
//           >
//             <MenuIcon />
//           </IconButton>

//           <Menu
//             anchorEl={menuAnchorEl}
//             open={activeMenuId === filter.ID}
//             onClose={handleMenuClose}
//           >
//             <MenuItem onClick={() => handleEditFilter(filter)}>
//               Edit
//             </MenuItem>
//             <MenuItem onClick={() => handleDeleteFilter(filter.ID)}>
//               Delete
//             </MenuItem>
//           </Menu>
//         </Box>

//                 <CustomAvatar skin="light" sx={{ width: 50, height: 50, mb: 2.25 }}>
//                   <Icon icon="bx:filter" fontSize="2rem" />
//                 </CustomAvatar>

//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   {filter.Name}
//                 </Typography>

//                 <Box sx={{ width: '100%', mt: 2 }}>
//                   <Typography variant="caption" color="textSecondary">
//                     Filter ID: {filter.ID}
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
//                     Column ID: {filter.ColumnID}
//                   </Typography>
//                 </Box>

//                 <Select
//                   value={dropdownValues[filter.ID] || ''}
//                   onChange={(event) => handleDropdownChange(event, filter.ID)}
//                   displayEmpty
//                   fullWidth
//                   sx={{ textTransform: 'none', mt: 2 }}
//                   disabled={loadingOptions[filter.ID]}
//                 >
//                   <MenuItem value="" disabled>
//                     {loadingOptions[filter.ID] ? 'Loading...' : 'Select a value'}
//                   </MenuItem>
//                   {filterOptions[filter.ID]?.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       )}

//       {/* Edit Modal */}
//       {/* <Modal
//         open={openEditModal}
//         onClose={handleCancelEdit}
//         aria-labelledby="edit-filter-modal"
//         aria-describedby="edit-filter-modal-description"
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
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Edit Filter
//           </Typography>
//           <TextField
//             fullWidth
//             label="Filter Name"
//             value={filterName}
//             onChange={(e) => setFilterName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Query"
//             value={filterQuery}
//             onChange={(e) => setFilterQuery(e.target.value)}
//             sx={{ mb: 2 }}
//             multiline    
//             rows={4}     
//             maxRows={8}  
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//             <Button variant="outlined" onClick={handleCancelEdit}>
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleUpdateFilter}>
//               Update
//             </Button>
//           </Box>
//         </Box>
//       </Modal> */}

// {/* Temp change */}


// <Modal
//   open={openEditModal}
//   onClose={handleCancelEdit}
//   aria-labelledby="edit-filter-modal"
//   aria-describedby="edit-filter-modal-description"
// >
//   <Box
//     sx={{
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: 600, // Increased width
//       bgcolor: 'background.paper',
//       boxShadow: 24,
//       p: 4, // Padding around the entire modal content
//       borderRadius: 1,
//     }}
//   >
//     <Typography variant="h6" sx={{ mb: 3 }}> {/* Increased margin-bottom */}
//       Edit Filter
//     </Typography>
//     <TextField
//       fullWidth
//       label="Filter Name"
//       value={filterName}
//       onChange={(e) => setFilterName(e.target.value)}
//       sx={{ mb: 3 }} // Increased margin-bottom
//     />
//     <TextField
//       fullWidth
//       label="Query"
//       value={filterQuery}
//       onChange={(e) => setFilterQuery(e.target.value)}
//       sx={{ mb: 3 }} // Increased margin-bottom
//       multiline
//       rows={6} // Increased rows for more height
//       maxRows={10} // Increased maxRows
//     />
//     <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 3 }}> {/* Increased gap and margin-top */}
//       <Button variant="outlined" onClick={handleCancelEdit}>
//         Cancel
//       </Button>
//       <Button variant="contained" onClick={handleUpdateFilter}>
//         Update
//       </Button>
//     </Box>
//   </Box>
// </Modal>






//     </Box>
//   );
// };

// export default Filters;




// api binding to update filter


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';
// ** API Imports
import getAllFiltersBySetID from 'src/api/filter-datamodel/getAllFiltersBySetID';
import getAllValuesForFilterInModel from 'src/api/filter-datamodel/getAllValuesForFilterInModel';
import updateFilterINDataModel from 'src/api/filter-datamodel/updateFilterINDataModel';

const Filters = () => {
  const router = useRouter();
  const { id } = router.query;

  const [anchorEl, setAnchorEl] = useState({});
  const [dropdownValues, setDropdownValues] = useState({});
  const [filters, setFilters] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingOptions, setLoadingOptions] = useState({});

  // State for Edit Modal
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  // Handling the dropdown option of 3-dot
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await getAllFiltersBySetID(id);

        if (!response.Data || response.Data.length === 0) {
          setFilters([]);
          return;
        }

        setFilters(response.Data || []);

        // Fetch dropdown values for each filter
        const optionsPromises = response.Data.map(async (filter) => {
          setLoadingOptions((prev) => ({ ...prev, [filter.ID]: true }));
          try {
            const values = await getAllValuesForFilterInModel(filter.ColumnID);
            setFilterOptions((prev) => ({ ...prev, [filter.ID]: values }));
          } catch (err) {
            console.error(`Failed to fetch options for filter ${filter.ID}:`, err);
            setFilterOptions((prev) => ({ ...prev, [filter.ID]: [] }));
          } finally {
            setLoadingOptions((prev) => ({ ...prev, [filter.ID]: false }));
          }
        });

        await Promise.all(optionsPromises);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, [id]);

  const handleDropdownChange = (event, filterId) => {
    setDropdownValues((prev) => ({
      ...prev,
      [filterId]: event.target.value,
    }));
  };

  // Handle Edit Filter
  const handleEditFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterName(filter.Name);
    setFilterQuery(filter.Query || '');
    setOpenEditModal(true);
    handleMenuClose();
  };

  // Handle Update Filter
  const handleUpdateFilter = async () => {
    if (!selectedFilter) return;

    const accessToken = localStorage.getItem('accessToken');
    const payload = {
      Name: filterName,
      Query: filterQuery,
      ColumnID: selectedFilter.ColumnID,
      VarID: selectedFilter.VarID,
      SetID: parseInt(id,10),
      Type: 'dummyType', 
    };

    try {
      const response = await updateFilterINDataModel(selectedFilter.ID, payload, accessToken);
      toast.success(`${filterName} updated successfully`);
      setOpenEditModal(false);

      // Refresh the filters list
      const updatedFilters = filters.map((filter) =>
        filter.ID === selectedFilter.ID ? { ...filter, Name: filterName, Query: filterQuery } : filter
      );
      setFilters(updatedFilters);
    } catch (error) {
      toast.error(error.message || 'Failed to update filter');
    }
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setOpenEditModal(false);
    setSelectedFilter(null);
    setFilterName('');
    setFilterQuery('');
  };

  // Handle Menu Open and Close
  const handleMenuOpen = (event, filterId) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setActiveMenuId(filterId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveMenuId(null);
  };

  // No filter message
  const NoFiltersMessage = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: 1,
        p: 3,
      }}
    >
      <Typography variant="h6" color="text.secondary">
        No Filter is present in this Data Model
      </Typography>
    </Box>
  );

  const handleCreateFilter = () => {
    const filterOptionId = 'create-filter';
    router.push(`/data-model/${id}/${filterOptionId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Filters</Typography>
        <Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick={handleCreateFilter}>
          Create Filters
        </Button>
      </Box>

      {filters.length === 0 ? (
        <NoFiltersMessage />
      ) : (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filters.map((filter) => (
            <Card key={filter.ID}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', padding: 3 }}>
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <IconButton onClick={(e) => handleMenuOpen(e, filter.ID)} aria-label="actions">
                    <MenuIcon />
                  </IconButton>

                  <Menu anchorEl={menuAnchorEl} open={activeMenuId === filter.ID} onClose={handleMenuClose}>
                    <MenuItem onClick={() => handleEditFilter(filter)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeleteFilter(filter.ID)}>Delete</MenuItem>
                  </Menu>
                </Box>

                <CustomAvatar skin="light" sx={{ width: 50, height: 50, mb: 2.25 }}>
                  <Icon icon="bx:filter" fontSize="2rem" />
                </CustomAvatar>

                <Typography variant="h6" sx={{ mb: 2 }}>
                  {filter.Name}
                </Typography>

                <Box sx={{ width: '100%', mt: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    Filter ID: {filter.ID}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    Column ID: {filter.ColumnID}
                  </Typography>
                </Box>

                <Select
                  value={dropdownValues[filter.ID] || ''}
                  onChange={(event) => handleDropdownChange(event, filter.ID)}
                  displayEmpty
                  fullWidth
                  sx={{ textTransform: 'none', mt: 2 }}
                  disabled={loadingOptions[filter.ID]}
                >
                  <MenuItem value="" disabled>
                    {loadingOptions[filter.ID] ? 'Loading...' : 'Select a value'}
                  </MenuItem>
                  {filterOptions[filter.ID]?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleCancelEdit}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Edit Filter
          </Typography>
          <TextField
            fullWidth
            label="Filter Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Query"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            sx={{ mb: 3 }}
            multiline
            rows={6}
            maxRows={10}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 3 }}>
            <Button variant="outlined" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdateFilter}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Filters;
