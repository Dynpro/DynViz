// // ** React Imports
// import { useState } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemText from '@mui/material/ListItemText'
// import ListItemButton from '@mui/material/ListItemButton'
// import Menu from '@mui/material/Menu'
// import Chip from '@mui/material/Chip'

// import TreeItem from '@mui/lab/TreeItem'
// import { alpha, styled } from '@mui/material/styles'
// import MuiTreeView from '@mui/lab/TreeView'
// import MuiAccordionSummary from '@mui/material/AccordionSummary'
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'
// import InputLabel from '@mui/material/InputLabel'
// import FormControl from '@mui/material/FormControl'
// import IconButton from '@mui/material/IconButton'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'
// import { Grid, Typography } from '@mui/material'
// import { color } from '@mui/system'

// // Styled component for AccordionSummary component
// const DBStructureHeader = styled(MuiAccordionSummary)(({ theme }) => ({
//   marginTop: 2,
//   borderRadius: 5,

//   //   padding: theme.spacing(0, 4),
//   //   minHeight: theme.spacing(12),
//   transition: 'min-height 0.15s ease-in-out',
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   borderBottom:
//     theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`
// }))

// // Styled TreeView component
// const TreeView = styled(MuiTreeView)(({ theme }) => ({
//   minHeight: 264,
//   '& .MuiTreeItem-iconContainer .close': {
//     opacity: 0.3
//   },
//   '& .MuiTreeItem-group': {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
//   }
// }))

// const options = ['Snowflake', 'PostgreSQL', 'MySQL', 'DynamoDB']

// const DBStructure = () => {
//   // ** State
//   const [selectedIndex, setSelectedIndex] = useState(1)

//   // ** Ref
//   const [anchorEl, setAnchorEl] = useState(null)

//   const handleClickListItem = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuItemClick = (event, index) => {
//     setAnchorEl(null)
//     setSelectedIndex(index)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <div>
//       {/* <DBStructureHeader> */}
//       {/* <FormControl variant='standard' fullWidth>
//           <InputLabel id='demo-simple-select-label'>Connection</InputLabel>
//           <Select label='Connection' labelId='demo-simple-select-label' id='demo-simple-select' defaultValue=''>
//             <MenuItem value={10}>Snowflake</MenuItem>
//             <MenuItem value={20}>PostgreSQL</MenuItem>
//             <MenuItem value={30}>MySQL</MenuItem>
//           </Select>
//         </FormControl> */}
//       <div>
//         {/* <Grid container alignItems='center'>
//           <Grid item paddingLeft={2}>
//             <Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />
//           </Grid>
//           <Grid item xs={8}>
//             <List component='nav' sx={{ p: 0 }} aria-label='Device settings'>
//               <ListItem
//                 disablePadding
//                 aria-haspopup='true'
//                 aria-controls='lock-menu'
//                 onClick={handleClickListItem}
//                 aria-label='when device is locked'
//               >
//                 <ListItemButton>
//                   <ListItemText primary={options[selectedIndex]} />

//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Grid>
//           <Grid item paddingLeft={2}>
//             <IconButton aria-label='capture screenshot' color='primary'>
//               <Icon icon='mi:refresh' />
//             </IconButton>
//           </Grid>
//         </Grid> */}

//         <Grid container alignItems='center' justifyContent='space-between'>
//           <Grid item xs={8}>
//             <List component='nav' sx={{ p: 0 }} aria-label='Device settings'>
//               <ListItem
//                 disablePadding
//                 aria-haspopup='true'
//                 aria-controls='lock-menu'
//                 onClick={handleClickListItem}
//                 aria-label='when device is locked'
//               >
//                 <ListItemButton>
//                   <Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />

//                   <ListItemText primary={options[selectedIndex]} sx={{ paddingLeft: 3 }} />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Grid>
//           <Grid item paddingX={2}>
//             <IconButton aria-label='capture screenshot' color='primary'>
//               {/* <Icon icon='ic:round-refresh' /> */}
//               <Icon icon='mi:refresh' />
//             </IconButton>
//           </Grid>
//         </Grid>
//         <Menu id='lock-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
//           {options.map((option, index) => (
//             <MenuItem
//               key={option}
//               disabled={index === 0}
//               selected={index === selectedIndex}
//               onClick={event => handleMenuItemClick(event, index)}
//             >
//               {option}
//             </MenuItem>
//           ))}
//         </Menu>
//       </div>
//       {/* </DBStructureHeader> */}
//       <TreeView
//         defaultExpanded={['1']}
//         defaultExpandIcon={
//           <Box sx={{ display: 'flex' }}>
//             <Icon icon='material-symbols:schema' />
//           </Box>
//         }
//         defaultCollapseIcon={
//           <Box sx={{ display: 'flex' }}>
//             <Icon icon='mdi:minus-box-outline' />
//           </Box>
//         }
//         defaultEndIcon={
//           <Box sx={{ display: 'flex' }}>
//             <Icon icon='mingcute:column-fill' className='close' />
//           </Box>
//         }
//       >
//         {/* <TreeItem nodeId='1' label='Schema'>
//           <TreeItem nodeId='3' label='Tables'>
//             <TreeItem nodeId='8' label='Table Name'>
//               <TreeItem nodeId='9' label='Column 1' />
//               <TreeItem nodeId='10' label='Column 2' />
//               <TreeItem nodeId='11' label='Column 3' />
//             </TreeItem>

//             <TreeItem nodeId='8' label='Hello' />
//           </TreeItem>

//           <TreeItem nodeId='4' label='Views' />
//           <TreeItem nodeId='5' label='Something something' />
//         </TreeItem> */}
//         <TreeItem nodeId='1' label='Schema'>
//           <TreeItem nodeId='2' label='Tables'>
//             <TreeItem nodeId='3' label='Table Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>

//           <TreeItem nodeId='4' label='Views'>
//             <TreeItem nodeId='5' label='View Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>
//         </TreeItem>
//         <TreeItem nodeId='6' label='Schema'>
//           <TreeItem nodeId='7' label='Tables'>
//             <TreeItem nodeId='8' label='Table Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>

//           <TreeItem nodeId='9' label='Views'>
//             <TreeItem nodeId='10' label='View Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>
//         </TreeItem>
//       </TreeView>
//     </div>
//   )
// }

// export default DBStructure





//  API Binding


// // ** React Imports
// import { useState, useEffect } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemText from '@mui/material/ListItemText'
// import ListItemButton from '@mui/material/ListItemButton'
// import Menu from '@mui/material/Menu'
// import Chip from '@mui/material/Chip'
// import Grid from '@mui/material/Grid'
// import IconButton from '@mui/material/IconButton'
// import TreeItem from '@mui/lab/TreeItem'
// import { alpha, styled } from '@mui/material/styles'
// import MuiTreeView from '@mui/lab/TreeView'
// import { MenuItem } from '@mui/material'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** API Import
// import getAllConnections from 'src/api/connections/getAllConnections'

// // Styled component for AccordionSummary component
// const DBStructureHeader = styled(MuiTreeView)(({ theme }) => ({
//   marginTop: 2,
//   borderRadius: 5,
//   transition: 'min-height 0.15s ease-in-out',
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   borderBottom: theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`
// }))

// // Styled TreeView component
// const TreeView = styled(MuiTreeView)(({ theme }) => ({
//   minHeight: 264,
//   '& .MuiTreeItem-iconContainer .close': {
//     opacity: 0.3
//   },
//   '& .MuiTreeItem-group': {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
//   }
// }))

// const DBStructure = () => {
//   // ** State
//   const [selectedIndex, setSelectedIndex] = useState(0)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [connections, setConnections] = useState([])

//   // ** Fetch connections when component mounts
//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const response = await getAllConnections()
//         if (response.code === 200 && response.Data) {
//           setConnections(response.Data)
//         }
//       } catch (error) {
//         console.error('Error fetching connections:', error)
//       }
//     }
//     fetchConnections()
//   }, [])

//   const handleClickListItem = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index)
//     setAnchorEl(null)
//     console.log('Selected Connection ID:', connections[index].ID)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <div>
//       <Grid container alignItems='center' justifyContent='space-between'>
//         <Grid item xs={8}>
//           <List component='nav' sx={{ p: 0 }} aria-label='Device settings'>
//             <ListItem
//               disablePadding
//               aria-haspopup='true'
//               aria-controls='lock-menu'
//               onClick={handleClickListItem}
//               aria-label='when device is locked'
//             >
//               <ListItemButton>
//                 <Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />
//                 <ListItemText primary={connections[selectedIndex]?.Name || 'No Connection'} sx={{ paddingLeft: 3 }} />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Grid>
//         <Grid item paddingX={2}>
//           <IconButton aria-label='capture screenshot' color='primary'>
//             <Icon icon='mi:refresh' />
//           </IconButton>
//         </Grid>
//       </Grid>
//       <Menu id='lock-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
//         {connections.map((connection, index) => (
//           <MenuItem
//             key={connection.ID}
//             selected={index === selectedIndex}
//             onClick={event => handleMenuItemClick(event, index)}
//           >
//             {connection.Name}
//           </MenuItem>
//         ))}
//       </Menu>
//       <TreeView
//         defaultExpanded={['1']}
//         defaultExpandIcon={
//           <Box sx={{ display: 'flex' }}>
//             <Icon icon='material-symbols:schema' />
//           </Box>
//         }
//         defaultCollapseIcon={
//           <Box sx={{ display: 'flex' }}>
//             <Icon icon='mdi:minus-box-outline' />
//           </Box>
//         }
//         defaultEndIcon={
//           <Box sx={{ display: 'flex' }}>
//             <Icon icon='mingcute:column-fill' className='close' />
//           </Box>
//         }
//       >
//         <TreeItem nodeId='1' label='Schema'>
//           <TreeItem nodeId='2' label='Tables'>
//             <TreeItem nodeId='3' label='Table Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>
//           <TreeItem nodeId='4' label='Views'>
//             <TreeItem nodeId='5' label='View Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>
//         </TreeItem>
//         <TreeItem nodeId='6' label='Schema'>
//           <TreeItem nodeId='7' label='Tables'>
//             <TreeItem nodeId='8' label='Table Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>
//           <TreeItem nodeId='9' label='Views'>
//             <TreeItem nodeId='10' label='View Name'>
//               <TreeItem label='Col 1'></TreeItem>
//               <TreeItem label='Col 2'></TreeItem>
//               <TreeItem label='Col 3'></TreeItem>
//               <TreeItem label='Col 4'></TreeItem>
//             </TreeItem>
//           </TreeItem>
//         </TreeItem>
//       </TreeView>
//     </div>
//   )
// }

// export default DBStructure




//  modified by arman khan




import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import TreeItem from '@mui/lab/TreeItem'
import { styled, alpha } from '@mui/material/styles'
import MuiTreeView from '@mui/lab/TreeView'

// Make sure the Icon component is imported correctly
import Icon from 'src/@core/components/icon'
import getAllConnections from 'src/api/connections/getAllConnections'
import getDBStructure from 'src/api/editors/getDBStructure'

// Styled components
const TreeView = styled(MuiTreeView)(({ theme }) => ({
  minHeight: 264,
  '& .MuiTreeItem-group': {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}))

const DBStructure = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [connections, setConnections] = useState([])
  const [dbStructure, setDbStructure] = useState({})

  // Fetch connections when component mounts
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await getAllConnections()
        if (response.code === 200 && response.Data) {
          setConnections(response.Data)
          // Fetch the DB structure for the first connection by default
          const structure = await getDBStructure(response.Data[0].ID)
          setDbStructure(structure)
        }
      } catch (error) {
        console.error('Error fetching connections:', error)
      }
    }
    fetchConnections()
  }, [])

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
    const structure = await getDBStructure(connections[index].ID)
    setDbStructure(structure)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item xs={8}>
          <List component='nav' sx={{ p: 0 }} aria-label='Device settings'>
            <ListItem
              disablePadding
              aria-haspopup='true'
              aria-controls='lock-menu'
              onClick={handleClickListItem}
              aria-label='when device is locked'
            >
              <ListItemButton>
                <Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />
                <ListItemText primary={connections[selectedIndex]?.Name || 'No Connection'} sx={{ paddingLeft: 3 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item paddingX={2}>
          <IconButton aria-label='capture screenshot' color='primary'>
            <Icon icon='mi:refresh' />
          </IconButton>
        </Grid>
      </Grid>
      <Menu id='lock-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {connections.map((connection, index) => (
          <MenuItem
            key={connection.ID}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {connection.Name}
          </MenuItem>
        ))}
      </Menu>
      <TreeView
        defaultExpanded={['1']}
        defaultExpandIcon={
          <Box sx={{ display: 'flex' }}>
            <Icon icon='material-symbols:schema' />
          </Box>
        }
        defaultCollapseIcon={
          <Box sx={{ display: 'flex' }}>
            <Icon icon='mdi:minus-box-outline' />
          </Box>
        }
        defaultEndIcon={
          <Box sx={{ display: 'flex' }}>
            <Icon icon='mingcute:column-fill' className='close' />
          </Box>
        }
      >
        {Object.keys(dbStructure).map(schema => (
          <TreeItem nodeId={schema} label={schema} key={schema}>
            {Object.keys(dbStructure[schema]).map(table => (
              <TreeItem nodeId={table} label={table} key={table}>
                {dbStructure[schema][table].map((column, index) => (
                  <TreeItem label={column.split(':')[0]} key={index}></TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </div>
  )
}

export default DBStructure
