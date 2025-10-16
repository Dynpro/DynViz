// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';

// const FilterOptions = () => {
//   const dummyVariables = ['Variable 1', 'Variable 2', 'Variable 3'];
//   const dummyColumns = ['Column 1', 'Column 2', 'Column 3'];

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//         p: 4,
//       }}
//     >
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           borderRight: 1,
//           borderColor: 'divider',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary">
//           Create Filter
//         </Typography>
//         <TextField
//           label="Filter Name"
//           variant="outlined"
//           fullWidth
//         />
//         <FormControl fullWidth>
//           <InputLabel id="variables-label">Variables</InputLabel>
//           <Select
//             labelId="variables-label"
//             id="variables"
//             label="Variables"
//           >
//             {dummyVariables.map((variable, index) => (
//               <MenuItem value={variable} key={index}>
//                 {variable}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel id="columns-label">Columns</InputLabel>
//           <Select
//             labelId="columns-label"
//             id="columns"
//             label="Columns"
//           >
//             {dummyColumns.map((column, index) => (
//               <MenuItem value={column} key={index}>
//                 {column}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Query"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//         >
//           RUN
//         </Button>

//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//         }}
//       >
//         {/* Leave the right side blank for now */}
//       </Box>
//     </Box>
//   );
// };

// export default FilterOptions;








// modified by arman khan






// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Slider from '@mui/material/Slider';

// const FilterOptions = () => {
//   const [filterName, setFilterName] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const dummyVariables = ['Variable 1', 'Variable 2', 'Variable 3'];
//   const dummyColumns = ['Column 1', 'Column 2', 'Column 3'];
//   const dummyOptions = ['Option 1', 'Option 2', 'Option 3'];

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//         p: 4,
//       }}
//     >
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           borderRight: 1,
//           borderColor: 'divider',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary">
//           Create Filter
//         </Typography>
//         <TextField
//           label="Filter Name"
//           variant="outlined"
//           fullWidth
//           value={filterName}
//           onChange={(e) => setFilterName(e.target.value)}
//         />
//         <FormControl fullWidth>
//           <InputLabel id="variables-label">Variables</InputLabel>
//           <Select
//             labelId="variables-label"
//             id="variables"
//             label="Variables"
//           >
//             {dummyVariables.map((variable, index) => (
//               <MenuItem value={variable} key={index}>
//                 {variable}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel id="columns-label">Columns</InputLabel>
//           <Select
//             labelId="columns-label"
//             id="columns"
//             label="Columns"
//           >
//             {dummyColumns.map((column, index) => (
//               <MenuItem value={column} key={index}>
//                 {column}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Query"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//         >
//           RUN
//         </Button>
  
//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//         }}
//       >
//         <Typography variant="h5" color="textPrimary">
//           Filter Preview
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id="filter-type-label">Filter Type</InputLabel>
//           <Select
//             labelId="filter-type-label"
//             id="filter-type"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             label="Filter Type"
//           >
//             <MenuItem value="radio">Single Select</MenuItem>
//             <MenuItem value="checkbox">Multi Select</MenuItem>
//             <MenuItem value="range">Range Slider</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Dynamic Preview */}
//         {filterType === 'radio' && (
//           <FormControl fullWidth>
//             <InputLabel id="single-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="single-select-label"
//               id="single-select"
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               label={filterName || 'Filter Name'}
//             >
//               {dummyOptions.map((option, index) => (
//                 <MenuItem value={option} key={index}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'checkbox' && (
//           <FormControl fullWidth>
//             <InputLabel id="multi-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="multi-select-label"
//               id="multi-select"
//               multiple
//               value={selectedOptions}
//               onChange={(e) => setSelectedOptions(e.target.value)}
//               label={filterName || 'Filter Name'}
//             >
//               {dummyOptions.map((option, index) => (
//                 <MenuItem value={option} key={index}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'range' && (
//           <>
//             <Typography>
//               {filterName || 'Filter Name'}
//             </Typography>
//             <Slider
//               defaultValue={50}
//               aria-label="Range Slider"
//               valueLabelDisplay="auto"
//             />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FilterOptions;





//  enhanching the ui - modified  by arman khan




// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Slider from '@mui/material/Slider';

// const FilterOptions = () => {
//   const [filterName, setFilterName] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const dummyVariables = ['Variable 1', 'Variable 2', 'Variable 3'];
//   const dummyColumns = ['Column 1', 'Column 2', 'Column 3'];
//   const dummyOptions = ['Option 1', 'Option 2', 'Option 3'];

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//         p: 4,
//         bgcolor: '#f9f9f9', 
//         boxShadow: 'inset 0 0 10px #ddd',
//       }}
//     >
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           borderRight: 1,
//           borderColor: 'divider',
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Create Filter
//         </Typography>
//         <TextField
//           label="Filter Name"
//           variant="outlined"
//           fullWidth
//           value={filterName}
//           onChange={(e) => setFilterName(e.target.value)}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <FormControl fullWidth>
//           <InputLabel id="variables-label">Variables</InputLabel>
//           <Select
//             labelId="variables-label"
//             id="variables"
//             label="Variables"
//             sx={{ bgcolor: '#fff' }}
//           >
//             {dummyVariables.map((variable, index) => (
//               <MenuItem value={variable} key={index}>
//                 {variable}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel id="columns-label">Columns</InputLabel>
//           <Select
//             labelId="columns-label"
//             id="columns"
//             label="Columns"
//             sx={{ bgcolor: '#fff' }}
//           >
//             {dummyColumns.map((column, index) => (
//               <MenuItem value={column} key={index}>
//                 {column}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Query"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           sx={{
//             bgcolor: '#1976d2',
//             '&:hover': { bgcolor: '#1565c0' },
//             fontWeight: 'bold',
//           }}
//         >
//           CREATE FILTER
//         </Button>
//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Filter Preview
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id="filter-type-label">Filter Type</InputLabel>
//           <Select
//             labelId="filter-type-label"
//             id="filter-type"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             label="Filter Type"
//             sx={{ bgcolor: '#fff' }}
//           >
//             <MenuItem value="radio">Single Select</MenuItem>
//             <MenuItem value="checkbox">Multi Select</MenuItem>
//             <MenuItem value="range">Range Slider</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Dynamic Preview */}
//         {filterType === 'radio' && (
//           <FormControl fullWidth>
//             <InputLabel id="single-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="single-select-label"
//               id="single-select"
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {dummyOptions.map((option, index) => (
//                 <MenuItem value={option} key={index}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'checkbox' && (
//           <FormControl fullWidth>
//             <InputLabel id="multi-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="multi-select-label"
//               id="multi-select"
//               multiple
//               value={selectedOptions}
//               onChange={(e) => setSelectedOptions(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {dummyOptions.map((option, index) => (
//                 <MenuItem value={option} key={index}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'range' && (
//           <>
//             <Typography>
//               {filterName || 'Filter Name'}
//             </Typography>
//             <Slider
//               defaultValue={50}
//               aria-label="Range Slider"
//               valueLabelDisplay="auto"
//             />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FilterOptions;



//  api binding to get all variables







// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Slider from '@mui/material/Slider';
// import getAllVariables from 'src/api/filter-datamodel/getAllVariable';
// import { useRouter } from 'next/router'

// const FilterOptions = () => {
//   const [filterName, setFilterName] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [variables, setVariables] = useState([]);
//   const [loadingVariables, setLoadingVariables] = useState(false);

 

//   const router = useRouter()
//   const {id, filterOptionId} = router.query


//   const fetchVariables = async () => {
//     setLoadingVariables(true);
//     try {
//       console.log("this is set id--", id)
//       const data = await getAllVariables(id);
//       setVariables(data);
//     } catch (error) {
//       console.error('Error fetching variables:', error);
//     } finally {
//       setLoadingVariables(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//         p: 4,
//         bgcolor: '#f9f9f9',
//         boxShadow: 'inset 0 0 10px #ddd',
//       }}
//     >
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           borderRight: 1,
//           borderColor: 'divider',
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Create Filter
//         </Typography>
//         <TextField
//           label="Filter Name"
//           variant="outlined"
//           fullWidth
//           value={filterName}
//           onChange={(e) => setFilterName(e.target.value)}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <FormControl fullWidth>
//           <InputLabel id="variables-label">Variables</InputLabel>
//           <Select
//             labelId="variables-label"
//             id="variables"
//             label="Variables"
//             sx={{ bgcolor: '#fff' }}
//             onOpen={fetchVariables} // Fetch data when dropdown is opened
//             defaultValue=""
//           >
//             {loadingVariables ? (
//               <MenuItem disabled>Loading...</MenuItem>
//             ) : (
//               variables.map((variable) => (
//                 <MenuItem
//                   value={variable.ID}
//                   key={variable.ID}
//                   data-setid={variable.SetID}
//                   data-tableid={variable.TableID}
//                 >
//                   {variable.Name}
//                 </MenuItem>
//               ))
//             )}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel id="columns-label">Columns</InputLabel>
//           <Select
//             labelId="columns-label"
//             id="columns"
//             label="Columns"
//             sx={{ bgcolor: '#fff' }}
//           >
//             {/* Placeholder for column options */}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Query"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           sx={{
//             bgcolor: '#1976d2',
//             '&:hover': { bgcolor: '#1565c0' },
//             fontWeight: 'bold',
//           }}
//         >
//           CREATE FILTER
//         </Button>
//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Filter Preview
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id="filter-type-label">Filter Type</InputLabel>
//           <Select
//             labelId="filter-type-label"
//             id="filter-type"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             label="Filter Type"
//             sx={{ bgcolor: '#fff' }}
//           >
//             <MenuItem value="radio">Single Select</MenuItem>
//             <MenuItem value="checkbox">Multi Select</MenuItem>
//             <MenuItem value="range">Range Slider</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Dynamic Preview */}
//         {filterType === 'radio' && (
//           <FormControl fullWidth>
//             <InputLabel id="single-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="single-select-label"
//               id="single-select"
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for radio */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'checkbox' && (
//           <FormControl fullWidth>
//             <InputLabel id="multi-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="multi-select-label"
//               id="multi-select"
//               multiple
//               value={selectedOptions}
//               onChange={(e) => setSelectedOptions(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for checkbox */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'range' && (
//           <>
//             <Typography>{filterName || 'Filter Name'}</Typography>
//             <Slider
//               defaultValue={50}
//               aria-label="Range Slider"
//               valueLabelDisplay="auto"
//             />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FilterOptions;



//  fixing the issue for out-of-range value




// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Slider from '@mui/material/Slider';
// import getAllVariables from 'src/api/filter-datamodel/getAllVariable';
// import { useRouter } from 'next/router';

// const FilterOptions = () => {
//   const [filterName, setFilterName] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [variables, setVariables] = useState([]);
//   const [loadingVariables, setLoadingVariables] = useState(false);

//   const router = useRouter();
//   const { id, filterOptionId } = router.query;

//   const fetchVariables = async () => {
//     setLoadingVariables(true);
//     try {
//       const data = await getAllVariables(id);
//       setVariables(data);
//     } catch (error) {
//       console.error('Error fetching variables:', error);
//     } finally {
//       setLoadingVariables(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//         p: 4,
//         bgcolor: '#f9f9f9',
//         boxShadow: 'inset 0 0 10px #ddd',
//       }}
//     >
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           borderRight: 1,
//           borderColor: 'divider',
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Create Filter
//         </Typography>
//         <TextField
//           label="Filter Name"
//           variant="outlined"
//           fullWidth
//           value={filterName}
//           onChange={(e) => setFilterName(e.target.value)}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <FormControl fullWidth>
//           <InputLabel id="variables-label">Variables</InputLabel>
//           <Select
//             labelId="variables-label"
//             id="variables"
//             value={selectedOption || ''} 
//             onChange={(e) => setSelectedOption(e.target.value)}
//             onOpen={fetchVariables} 
//             label="Variables"
//             sx={{ bgcolor: '#fff' }}
//           >
//             {loadingVariables ? (
//               <MenuItem disabled>Loading...</MenuItem>
//             ) : (
//               variables.map((variable) => (
//                 <MenuItem
//                   value={variable.ID}
//                   key={variable.ID}
//                   data-setid={variable.SetID}
//                   data-tableid={variable.TableID}
//                 >
//                   {variable.Name}
//                 </MenuItem>
//               ))
//             )}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel id="columns-label">Columns</InputLabel>
//           <Select
//             labelId="columns-label"
//             id="columns"
//             value="" 
//             onChange={(e) => console.log(e.target.value)} 
//             label="Columns"
//             sx={{ bgcolor: '#fff' }}
//           >
//             <MenuItem value="">None</MenuItem>
//             {/* Placeholder for column options */}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Query"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           sx={{
//             bgcolor: '#1976d2',
//             '&:hover': { bgcolor: '#1565c0' },
//             fontWeight: 'bold',
//           }}
//         >
//           CREATE FILTER
//         </Button>
//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Filter Preview
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id="filter-type-label">Filter Type</InputLabel>
//           <Select
//             labelId="filter-type-label"
//             id="filter-type"
//             value={filterType || ''} 
//             onChange={(e) => setFilterType(e.target.value)}
//             label="Filter Type"
//             sx={{ bgcolor: '#fff' }}
//           >
//             <MenuItem value="radio">Single Select</MenuItem>
//             <MenuItem value="checkbox">Multi Select</MenuItem>
//             <MenuItem value="range">Range Slider</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Dynamic Preview */}
//         {filterType === 'radio' && (
//           <FormControl fullWidth>
//             <InputLabel id="single-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="single-select-label"
//               id="single-select"
//               value={selectedOption || ''} 
//               onChange={(e) => setSelectedOption(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for radio */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'checkbox' && (
//           <FormControl fullWidth>
//             <InputLabel id="multi-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="multi-select-label"
//               id="multi-select"
//               multiple
//               value={selectedOptions} 
//               onChange={(e) => setSelectedOptions(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for checkbox */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'range' && (
//           <>
//             <Typography>{filterName || 'Filter Name'}</Typography>
//             <Slider
//               defaultValue={50}
//               aria-label="Range Slider"
//               valueLabelDisplay="auto"
//             />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FilterOptions;



//  get all column api binded




// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Slider from '@mui/material/Slider';
// import getAllVariables from 'src/api/filter-datamodel/getAllVariable';
// import { getAllColumns } from 'src/api/filter-datamodel/getAllColumn';
// import { useRouter } from 'next/router';

// const FilterOptions = () => {
//   const [filterName, setFilterName] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [variables, setVariables] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [loadingVariables, setLoadingVariables] = useState(false);
//   const [loadingColumns, setLoadingColumns] = useState(false);
//   const [tableId, setTableId] = useState(null);

//   const router = useRouter();
//   const { id, filterOptionId } = router.query;

//   const fetchVariables = async () => {
//     setLoadingVariables(true);
//     try {
//       const data = await getAllVariables(id);
//       setVariables(data);
//     } catch (error) {
//       console.error('Error fetching variables:', error);
//     } finally {
//       setLoadingVariables(false);
//     }
//   };

//   const fetchColumns = async () => {
//     if (!tableId) return;
    
//     setLoadingColumns(true);
//     try {
//       const data = await getAllColumns(tableId);
//       setColumns(data);
//     } catch (error) {
//       console.error('Error fetching columns:', error);
//     } finally {
//       setLoadingColumns(false);
//     }
//   };

//   const handleVariableChange = (event) => {
//     const selectedVariable = variables.find(v => v.ID === event.target.value);
//     if (selectedVariable) {
//       setTableId(selectedVariable.TableID);
//       setSelectedColumn("")
//     }
//   };

//   const handleColumnChange = (event) => {
//     setSelectedColumn(event.target.value);
//   };

//   // Fetch columns when tableId changes
//   useEffect(() => {
//     if (tableId) {
//       fetchColumns();
      
//     }
//   }, [tableId]);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//         p: 4,
//         bgcolor: '#f9f9f9',
//         boxShadow: 'inset 0 0 10px #ddd',
//       }}
//     >
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           borderRight: 1,
//           borderColor: 'divider',
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Create Filter
//         </Typography>
//         <TextField
//           label="Filter Name"
//           variant="outlined"
//           fullWidth
//           value={filterName}
//           onChange={(e) => setFilterName(e.target.value)}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <FormControl fullWidth>
//           <InputLabel id="variables-label">Variables</InputLabel>
//           <Select
//             labelId="variables-label"
//             id="variables"
//             label="Variables"
//             sx={{ bgcolor: '#fff' }}
//             onOpen={fetchVariables}
//             onChange={handleVariableChange}
//             defaultValue=""
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 48 * 6 + 8, 
//                   overflowY: 'auto',
//                 },
//               },
//             }}
//           >
//             {loadingVariables ? (
//               <MenuItem disabled>Loading...</MenuItem>
//             ) : (
//               variables.map((variable) => (
//                 <MenuItem
//                   value={variable.ID}
//                   key={variable.ID}
//                   data-setid={variable.SetID}
//                   data-tableid={variable.TableID}
//                 >
//                   {variable.Name}
//                 </MenuItem>
//               ))
//             )}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel id="columns-label">Columns</InputLabel>
//           <Select
//             labelId="columns-label"
//             id="columns"
//             label="Columns"
//             value={selectedColumn}
//             onChange={handleColumnChange}
//             sx={{ bgcolor: '#fff' }}
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 48 * 6 + 8, 
//                   overflowY: 'auto',
//                 },
//               },
//             }}
//           >
//             {loadingColumns ? (
//               <MenuItem disabled>Loading...</MenuItem>
//             ) : (
//               columns.map((column) => (
//                 <MenuItem value={column.Name} key={column.ID}>
//                   {column.Name}
//                 </MenuItem>
//               ))
//             )}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Query"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           sx={{
//             bgcolor: '#1976d2',
//             '&:hover': { bgcolor: '#1565c0' },
//             fontWeight: 'bold',
//           }}
//         >
//           CREATE FILTER
//         </Button>
//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Filter Preview
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id="filter-type-label">Filter Type</InputLabel>
//           <Select
//             labelId="filter-type-label"
//             id="filter-type"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             label="Filter Type"
//             sx={{ bgcolor: '#fff' }}
//           >
//             <MenuItem value="radio">Single Select</MenuItem>
//             <MenuItem value="checkbox">Multi Select</MenuItem>
//             <MenuItem value="range">Range Slider</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Dynamic Preview */}
//         {filterType === 'radio' && (
//           <FormControl fullWidth>
//             <InputLabel id="single-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="single-select-label"
//               id="single-select"
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for radio */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'checkbox' && (
//           <FormControl fullWidth>
//             <InputLabel id="multi-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="multi-select-label"
//               id="multi-select"
//               multiple
//               value={selectedOptions}
//               onChange={(e) => setSelectedOptions(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for checkbox */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'range' && (
//           <>
//             <Typography>{filterName || 'Filter Name'}</Typography>
//             <Slider
//               defaultValue={50}
//               aria-label="Range Slider"
//               valueLabelDisplay="auto"
//             />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FilterOptions;





//  create filter api binded 






// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Slider from '@mui/material/Slider';
// import { toast } from 'react-toastify';
// import getAllVariables from 'src/api/filter-datamodel/getAllVariable';
// import { getAllColumns } from 'src/api/filter-datamodel/getAllColumn';
// import createFilter from 'src/api/filter-datamodel/createFilter';
// import { useRouter } from 'next/router';

// const FilterOptions = () => {
//   const [filterName, setFilterName] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [variables, setVariables] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [loadingVariables, setLoadingVariables] = useState(false);
//   const [loadingColumns, setLoadingColumns] = useState(false);
//   const [tableId, setTableId] = useState(null);
//   const [selectedVarId, setSelectedVarId] = useState(null);
//   const [selectedColumnId, setSelectedColumnId] = useState(null);
//   const [query, setQuery] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter();
//   const { id: setId, filterOptionId } = router.query;

//   const fetchVariables = async () => {
//     setLoadingVariables(true);
//     try {
//       const data = await getAllVariables(setId);
//       setVariables(data);
//     } catch (error) {
//       console.error('Error fetching variables:', error);
//       toast.error('Failed to fetch variables');
//     } finally {
//       setLoadingVariables(false);
//     }
//   };

//   const fetchColumns = async () => {
//     if (!tableId) return;
    
//     setLoadingColumns(true);
//     try {
//       const data = await getAllColumns(tableId);
//       setColumns(data);
//     } catch (error) {
//       console.error('Error fetching columns:', error);
//       toast.error('Failed to fetch columns');
//     } finally {
//       setLoadingColumns(false);
//     }
//   };

//   const handleVariableChange = (event) => {
//     const selectedVariable = variables.find(v => v.ID === event.target.value);
//     if (selectedVariable) {
//       setTableId(selectedVariable.TableID);
//       setSelectedVarId(selectedVariable.ID);
//       setSelectedColumn("");
//       setSelectedColumnId(null);
//     }
//   };

//   const handleColumnChange = (event) => {
//     const selectedCol = columns.find(col => col.Name === event.target.value);
//     if (selectedCol) {
//       setSelectedColumn(selectedCol.Name);
//       setSelectedColumnId(selectedCol.ID);
//     }
//   };

//   const handleCreateFilter = async () => {
//     if (!filterName.trim()) {
//       toast.error('Please enter a filter name');
//       return;
//     }

//     if (!selectedVarId) {
//       toast.error('Please select a variable');
//       return;
//     }

//     // if (!selectedColumnId) {
//     //   toast.error('Please select a column');
//     //   return;
//     // }

//     if (!query.trim()) {
//       toast.error('Please enter a query');
//       return;
//     }

//     const payload = {
//       Name: filterName.trim(),
//       Query: query.trim(),
//       ColumnID: selectedColumnId,
//       VarID: selectedVarId,
//       SetID: parseInt(setId),
//       Type: "requestData"
//     };

//     setIsSubmitting(true);
//     try {
//       const response = await createFilter(payload);
//       toast.success('Filter Created Successfully!');
      
//       // Optional: Reset form or redirect
//       setFilterName('');
//       setQuery('');
//       setSelectedColumn('');
//       setSelectedVarId(null);
//       setSelectedColumnId(null);
//       setFilterType('');
      
//     } catch (error) {
//       console.error('Error creating filter:', error);
//       toast.error(error.message || 'Failed to create filter');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Fetch columns when tableId changes
//   useEffect(() => {
//     if (tableId) {
//       fetchColumns();
//     }
//   }, [tableId]);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//         p: 4,
//         bgcolor: '#f9f9f9',
//         boxShadow: 'inset 0 0 10px #ddd',
//       }}
//     >
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           borderRight: 1,
//           borderColor: 'divider',
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Create Filter
//         </Typography>
//         <TextField
//           label="Filter Name"
//           variant="outlined"
//           fullWidth
//           value={filterName}
//           onChange={(e) => setFilterName(e.target.value)}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <FormControl fullWidth>
//           <InputLabel id="variables-label">Variables</InputLabel>
//           <Select
//             labelId="variables-label"
//             id="variables"
//             label="Variables"
//             sx={{ bgcolor: '#fff' }}
//             onOpen={fetchVariables}
//             onChange={handleVariableChange}
//             value={selectedVarId || ''}
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 48 * 6 + 8,
//                   overflowY: 'auto',
//                 },
//               },
//             }}
//           >
//             {loadingVariables ? (
//               <MenuItem disabled>Loading...</MenuItem>
//             ) : (
//               variables.map((variable) => (
//                 <MenuItem
//                   value={variable.ID}
//                   key={variable.ID}
//                   data-setid={variable.SetID}
//                   data-tableid={variable.TableID}
//                 >
//                   {variable.Name}
//                 </MenuItem>
//               ))
//             )}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel id="columns-label">Columns</InputLabel>
//           <Select
//             labelId="columns-label"
//             id="columns"
//             label="Columns"
//             value={selectedColumn}
//             onChange={handleColumnChange}
//             sx={{ bgcolor: '#fff' }}
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 48 * 6 + 8,
//                   overflowY: 'auto',
//                 },
//               },
//             }}
//           >
//             {loadingColumns ? (
//               <MenuItem disabled>Loading...</MenuItem>
//             ) : (
//               columns.map((column) => (
//                 <MenuItem value={column.Name} key={column.ID}>
//                   {column.Name}
//                 </MenuItem>
//               ))
//             )}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Query"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           sx={{ bgcolor: '#fff' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={handleCreateFilter}
//           disabled={isSubmitting}
//           sx={{
//             bgcolor: '#1976d2',
//             '&:hover': { bgcolor: '#1565c0' },
//             fontWeight: 'bold',
//           }}
//         >
//           {isSubmitting ? 'CREATING...' : 'CREATE FILTER'}
//         </Button>
//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 4,
//           bgcolor: '#ffffff',
//           borderRadius: '8px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" color="textPrimary" fontWeight="bold">
//           Filter Preview
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id="filter-type-label">Filter Type</InputLabel>
//           <Select
//             labelId="filter-type-label"
//             id="filter-type"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             label="Filter Type"
//             sx={{ bgcolor: '#fff' }}
//           >
//             <MenuItem value="radio">Single Select</MenuItem>
//             <MenuItem value="checkbox">Multi Select</MenuItem>
//             <MenuItem value="range">Range Slider</MenuItem>
//           </Select>
//         </FormControl>

      
//         {filterType === 'radio' && (
//           <FormControl fullWidth>
//             <InputLabel id="single-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="single-select-label"
//               id="single-select"
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for radio */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'checkbox' && (
//           <FormControl fullWidth>
//             <InputLabel id="multi-select-label">
//               {filterName || 'Filter Name'}
//             </InputLabel>
//             <Select
//               labelId="multi-select-label"
//               id="multi-select"
//               multiple
//               value={selectedOptions}
//               onChange={(e) => setSelectedOptions(e.target.value)}
//               label={filterName || 'Filter Name'}
//               sx={{ bgcolor: '#fff' }}
//             >
//               {/* Options for checkbox */}
//             </Select>
//           </FormControl>
//         )}
//         {filterType === 'range' && (
//           <>
//             <Typography>{filterName || 'Filter Name'}</Typography>
//             <Slider
//               defaultValue={50}
//               aria-label="Range Slider"
//               valueLabelDisplay="auto"
//             />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FilterOptions;







// adding comming soon message- remember previous code has dynamic dropdown generation code you can use it later







import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import { toast } from 'react-toastify';
import getAllVariables from 'src/api/filter-datamodel/getAllVariable';
import { getAllColumns } from 'src/api/filter-datamodel/getAllColumn';
import createFilter from 'src/api/filter-datamodel/createFilter';
import { useRouter } from 'next/router';

const FilterOptions = () => {
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [variables, setVariables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [loadingVariables, setLoadingVariables] = useState(false);
  const [loadingColumns, setLoadingColumns] = useState(false);
  const [tableId, setTableId] = useState(null);
  const [selectedVarId, setSelectedVarId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { id: setId, filterOptionId } = router.query;

  const fetchVariables = async () => {
    setLoadingVariables(true);
    try {
      const data = await getAllVariables(setId);
      setVariables(data);
    } catch (error) {
      console.error('Error fetching variables:', error);
      toast.error('Failed to fetch variables');
    } finally {
      setLoadingVariables(false);
    }
  };

  const fetchColumns = async () => {
    if (!tableId) return;
    
    setLoadingColumns(true);
    try {
      const data = await getAllColumns(tableId);
      setColumns(data);
    } catch (error) {
      console.error('Error fetching columns:', error);
      toast.error('Failed to fetch columns');
    } finally {
      setLoadingColumns(false);
    }
  };

  const handleVariableChange = (event) => {
    const selectedVariable = variables.find(v => v.ID === event.target.value);
    if (selectedVariable) {
      setTableId(selectedVariable.TableID);
      setSelectedVarId(selectedVariable.ID);
      setSelectedColumn("");
      setSelectedColumnId(null);
    }
  };

  const handleColumnChange = (event) => {
    const selectedCol = columns.find(col => col.Name === event.target.value);
    if (selectedCol) {
      setSelectedColumn(selectedCol.Name);
      setSelectedColumnId(selectedCol.ID);
    }
  };

  const handleCreateFilter = async () => {
    if (!filterName.trim()) {
      toast.error('Please enter a filter name');
      return;
    }

    if (!selectedVarId) {
      toast.error('Please select a variable');
      return;
    }

    // if (!selectedColumnId) {
    //   toast.error('Please select a column');
    //   return;
    // }

    if (!query.trim()) {
      toast.error('Please enter a query');
      return;
    }

    const payload = {
      Name: filterName.trim(),
      Query: query.trim(),
      ColumnID: selectedColumnId,
      VarID: selectedVarId,
      SetID: parseInt(setId),
      Type: "requestData"
    };

    setIsSubmitting(true);
    try {
      const response = await createFilter(payload);
      toast.success('Filter Created Successfully!');
      
      // Optional: Reset form or redirect
      setFilterName('');
      setQuery('');
      setSelectedColumn('');
      setSelectedVarId(null);
      setSelectedColumnId(null);
      setFilterType('');
      
    } catch (error) {
      console.error('Error creating filter:', error);
      toast.error(error.message || 'Failed to create filter');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch columns when tableId changes
  useEffect(() => {
    if (tableId) {
      fetchColumns();
    }
  }, [tableId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        p: 4,
        bgcolor: '#f9f9f9',
        boxShadow: 'inset 0 0 10px #ddd',
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" color="textPrimary" fontWeight="bold">
          Create Filter
        </Typography>
        <TextField
          label="Filter Name"
          variant="outlined"
          fullWidth
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          sx={{ bgcolor: '#fff' }}
        />
        <FormControl fullWidth>
          <InputLabel id="variables-label">Variables</InputLabel>
          <Select
            labelId="variables-label"
            id="variables"
            label="Variables"
            sx={{ bgcolor: '#fff' }}
            onOpen={fetchVariables}
            onChange={handleVariableChange}
            value={selectedVarId || ''}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 6 + 8,
                  overflowY: 'auto',
                },
              },
            }}
          >
            {loadingVariables ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              variables.map((variable) => (
                <MenuItem
                  value={variable.ID}
                  key={variable.ID}
                  data-setid={variable.SetID}
                  data-tableid={variable.TableID}
                >
                  {variable.Name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="columns-label">Columns</InputLabel>
          <Select
            labelId="columns-label"
            id="columns"
            label="Columns"
            value={selectedColumn}
            onChange={handleColumnChange}
            sx={{ bgcolor: '#fff' }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 6 + 8,
                  overflowY: 'auto',
                },
              },
            }}
          >
            {loadingColumns ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              columns.map((column) => (
                <MenuItem value={column.Name} key={column.ID}>
                  {column.Name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <TextField
          label="Query"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ bgcolor: '#fff' }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateFilter}
          disabled={isSubmitting}
          sx={{
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' },
            fontWeight: 'bold',
          }}
        >
          {isSubmitting ? 'CREATING...' : 'CREATE FILTER'}
        </Button>
      </Box>

      {/* Right Side */}
      <Box
  sx={{
    flex: 1,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  <Typography variant="h5" color="grey.500">
    Coming Soon...
  </Typography>
</Box>

    </Box>
  );
};

export default FilterOptions;
