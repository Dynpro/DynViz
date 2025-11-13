// // ** React Imports
// import { useEffect, useState } from 'react'

// // ** Next Import
// import Link from 'next/link'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import Table from '@mui/material/Table'
// import Button from '@mui/material/Button'
// import Avatar from '@mui/material/Avatar'
// import Dialog from '@mui/material/Dialog'
// import Tooltip from '@mui/material/Tooltip'
// import Checkbox from '@mui/material/Checkbox'
// import TableRow from '@mui/material/TableRow'
// import { useTheme } from '@mui/material/styles'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableHead from '@mui/material/TableHead'
// import TextField from '@mui/material/TextField'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import FormControl from '@mui/material/FormControl'
// import DialogTitle from '@mui/material/DialogTitle'
// import CardContent from '@mui/material/CardContent'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import TableContainer from '@mui/material/TableContainer'
// import FormControlLabel from '@mui/material/FormControlLabel'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** API Imports
// import getRoles from '../../../api/roles/getRoles'
// import getAllMenus from '../../../api/roles/getAllMenus'
// import createRole from '../../../api/roles/createRole'
// import getRoleById from '../../../api/roles/getRoleById'
// import updateRole from '../../../api/roles/updateRole'
// import deleteRole from '../../../api/roles/deleteRole'

// // ** Toast Imports
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const RolesCards = () => {
//   // ** States
//   const [open, setOpen] = useState(false)
//   const [dialogTitle, setDialogTitle] = useState('Add')
//   const [roleName, setRoleName] = useState('')
//   const [selectedCheckbox, setSelectedCheckbox] = useState([])
//   const [roles, setRoles] = useState([])
//   const [menus, setMenus] = useState([])
//   const [editingRoleId, setEditingRoleId] = useState(null)

//   // ** Hook
//   const theme = useTheme()
//   const handleClickOpen = () => setOpen(true)

//   const handleClose = () => {
//     setOpen(false)
//     setRoleName('')
//     setSelectedCheckbox([])
//     setEditingRoleId(null)
//   }

//   const togglePermission = id => {
//     const arr = selectedCheckbox
//     if (selectedCheckbox.includes(id)) {
//       arr.splice(arr.indexOf(id), 1)
//     } else {
//       arr.push(id)
//     }
//     setSelectedCheckbox([...arr])
//   }

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const fetchedRoles = await getRoles()
//         console.log('Fetched Roles for cards:', fetchedRoles)

//         const transformedRoles = fetchedRoles.map(role => ({
//           totalUsers: 10,
//           title: role.name,
//           id: role.id
//         }))

//         setRoles(transformedRoles)
//       } catch (error) {
//         console.error('Error fetching roles:', error)
//       }
//     }

//     const fetchMenus = async () => {
//       try {
//         const response = await getAllMenus();
//         console.log(" This is the response variable---", response)
//         // const data = await response.json()
//         setMenus(response)
//       } catch (error) {
//         console.error('Error fetching menus:', error)
//       }
//     }

//     fetchRoles()
//     fetchMenus()
//   }, [])

//   const handleSubmit = async () => {
//     const permissions = {}

//     menus.forEach(menu => {
//       permissions[menu.ID] = { R: false, W: false, V: false }
//     })

//     selectedCheckbox.forEach(permission => {
//       const [id, type] = permission.split('-')
//       if (type === 'read') {
//         permissions[id].R = true
//       } else if (type === 'write') {
//         permissions[id].W = true
//       } else if (type === 'view') {
//         permissions[id].V = true
//       }
//     })

//     const payload = {
//       id: editingRoleId,
//       Name: roleName,
//       Permission: permissions
//     }

//     try {
//       if (editingRoleId) {
//         const response = await updateRole(payload)
//         console.log('Role updated successfully:', response)
//         toast.success('Role updated successfully')
//       } else {
//         const response = await createRole(roleName, permissions)
//         console.log('Role created successfully:', response)
//         toast.success('Role created successfully')
//       }
//       handleClose()
//       const fetchedRoles = await getRoles()
//       setRoles(
//         fetchedRoles.map(role => ({
//           totalUsers: 10,
//           title: role.name,
//           id: role.id
//         }))
//       )
//     } catch (error) {
//       console.error('Error creating/updating role:', error)
//       toast.error('Error creating/updating role')
//     }
//   }

//   const handleEditRole = async id => {
//     try {
//       const roleData = await getRoleById(id)
//       const role = roleData.Data.roles[0]
//       setRoleName(role.name)
//       setEditingRoleId(role.id)

//       const permissions = []
//       Object.keys(role.access_control).forEach(menuId => {
//         const access = role.access_control[menuId]
//         if (access.read_access) {
//           permissions.push(`${menuId}-read`)
//         }
//         if (access.write_access) {
//           permissions.push(`${menuId}-write`)
//         }
//         if (access.view_access) {
//           permissions.push(`${menuId}-view`)
//         }
//       })

//       setSelectedCheckbox(permissions)
//       handleClickOpen()
//       setDialogTitle('Edit')
//     } catch (error) {
//       console.error('Error fetching role details:', error)
//       toast.error('Error fetching role details')
//     }
//   }

//   const handleDeleteRole = async id => {
//     const payload = { id }

//     try {
//       const response = await deleteRole(payload)
//       console.log('Role deleted successfully:', response)
//       toast.success('Role deleted successfully')

//       setRoles(roles.filter(role => role.id !== id))
//     } catch (error) {
//       console.error('Error deleting role:', error)
//       toast.error('Error deleting role')
//     }
//   }

//   const renderCards = () =>
//     roles.map((item, index) => (
//       <Grid item xs={12} sm={6} lg={4} key={index}>
//         <Card>
//           <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
//             <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
//               <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.totalUsers} users`}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
//               <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
//                 <Typography variant='h5' sx={{ mb: 1 }}>
//                   {item.title}
//                 </Typography>
//                 <Typography
//                   href='/'
//                   variant='body2'
//                   component={Link}
//                   sx={{ color: 'primary.main', textDecoration: 'none' }}
//                   onClick={e => {
//                     e.preventDefault()
//                     handleEditRole(item.id)
//                   }}
//                 >
//                   Edit Role
//                 </Typography>
//               </Box>
//               <IconButton sx={{ color: 'text.primary' }} onClick={() => handleDeleteRole(item.id)}>
//                 <Icon fontSize={20} icon='bx:trash' />
//               </IconButton>
//             </Box>
//           </CardContent>
//         </Card>
//       </Grid>
//     ))

//   return (
//     <Grid container spacing={6} className='match-height'>
//       {renderCards()}
//       <Grid item xs={12} sm={6} lg={4}>
//         <Card
//           sx={{ cursor: 'pointer' }}
//           onClick={() => {
//             handleClickOpen()
//             setDialogTitle('Add')
//           }}
//         >
//           <Grid container sx={{ height: '100%' }}>
//             <Grid item xs={4}>
//               <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <img
//                   width={88}
//                   height={105}
//                   alt='add-role'
//                   src={`/images/pages/add-role-illustration-${theme.palette.mode}.png`}
//                   style={{ marginBottom: -2 }}
//                 />
//               </Box>
//             </Grid>
//             <Grid item xs={8}>
//               <CardContent
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <Avatar
//                   variant='rounded'
//                   sx={{
//                     mb: 2,
//                     width: 48,
//                     height: 48,
//                     boxShadow: 3,
//                     color: 'common.white',
//                     backgroundColor: 'primary.main'
//                   }}
//                 >
//                   <Icon icon='bx:plus' />
//                 </Avatar>
//                 <Typography variant='h6'>Add Role</Typography>
//                 <Typography variant='body2' sx={{ textAlign: 'center' }}>
//                   Add role, if it does not exist
//                 </Typography>
//               </CardContent>
//             </Grid>
//           </Grid>
//         </Card>
//       </Grid>

//       <Dialog
//         fullWidth
//         open={open}
//         maxWidth='sm'
//         scroll='body'
//         onClose={handleClose}
//         TransitionProps={{
//           onEntered: () => {
//             if (editingRoleId) {
//               // Fetch and set role data for editing
//               const fetchRoleData = async () => {
//                 try {
//                   const roleData = await getRoleById(editingRoleId)
//                   const role = roleData.Data.roles[0]
//                   setRoleName(role.name)

//                   const permissions = []
//                   Object.keys(role.access_control).forEach(menuId => {
//                     const access = role.access_control[menuId]
//                     if (access.read_access) {
//                       permissions.push(`${menuId}-read`)
//                     }
//                     if (access.write_access) {
//                       permissions.push(`${menuId}-write`)
//                     }
//                     if (access.view_access) {
//                       permissions.push(`${menuId}-view`)
//                     }
//                   })

//                   setSelectedCheckbox(permissions)
//                 } catch (error) {
//                   console.error('Error fetching role details:', error)
//                   toast.error('Error fetching role details')
//                 }
//               }

//               fetchRoleData()
//             }
//           }
//         }}
//       >
//         <DialogTitle sx={{ textAlign: 'center' }}>{`${dialogTitle} Role`}</DialogTitle>
//         <DialogContent
//           sx={{
//             pb: theme => `${theme.spacing(6.5)} !important`,
//             px: theme => `${theme.spacing(6.5)} !important`
//           }}
//         >
//           <Box sx={{ mb: 6 }}>
//             <FormControl fullWidth>
//               <TextField
//                 value={roleName}
//                 label='Role Name'
//                 placeholder='Enter Role Name'
//                 onChange={e => setRoleName(e.target.value)}
//               />
//             </FormControl>
//           </Box>
//           <Box>
//             <Typography variant='h6'>Role Permissions</Typography>
//           </Box>
//           <TableContainer>
//             <Table size='small' sx={{ border: theme => `1px solid ${theme.palette.divider}` }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}>Module</TableCell>
//                   <TableCell sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}>Read</TableCell>
//                   <TableCell sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}>Write</TableCell>
//                   {/* <TableCell>View</TableCell> */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {menus.map((menu, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}>
//                       {menu.Name}
//                     </TableCell>
//                     <TableCell sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}>
//                       <Checkbox
//                         value={`${menu.ID}-read`}
//                         onChange={() => togglePermission(`${menu.ID}-read`)}
//                         checked={selectedCheckbox.includes(`${menu.ID}-read`)}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}>
//                       <Checkbox
//                         value={`${menu.ID}-write`}
//                         onChange={() => togglePermission(`${menu.ID}-write`)}
//                         checked={selectedCheckbox.includes(`${menu.ID}-write`)}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Checkbox
//                         value={`${menu.ID}-view`}
//                         onChange={() => togglePermission(`${menu.ID}-view`)}
//                         checked={selectedCheckbox.includes(`${menu.ID}-view`)}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             justifyContent: 'center',
//             px: theme => `${theme.spacing(6.5)} !important`
//           }}
//         >
//           <Button variant='contained' sx={{ mr: 1 }} onClick={handleSubmit}>
//             Submit
//           </Button>
//           <Button variant='outlined' color='secondary' onClick={handleClose}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Grid>
//   )
// }

// export default RolesCards





// Menu pop ui enhanced 



// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import getRoles from '../../../api/roles/getRoles'
import getAllMenus from '../../../api/roles/getAllMenus'
import createRole from '../../../api/roles/createRole'
import getRoleById from '../../../api/roles/getRoleById'
import updateRole from '../../../api/roles/updateRole'
import deleteRole from '../../../api/roles/deleteRole'

// ** Toast Imports
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [roleName, setRoleName] = useState('')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [roles, setRoles] = useState([])
  const [menus, setMenus] = useState([])
  const [editingRoleId, setEditingRoleId] = useState(null)

  // ** Hook
  const theme = useTheme()
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setRoleName('')
    setSelectedCheckbox([])
    setEditingRoleId(null)
  }

  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
    } else {
      arr.push(id)
    }
    setSelectedCheckbox([...arr])
  }

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await getRoles()
        console.log('Fetched Roles for cards:', fetchedRoles)

        const transformedRoles = fetchedRoles.map(role => ({
          totalUsers: 10,
          title: role.name,
          id: role.id
        }))

        setRoles(transformedRoles)
      } catch (error) {
        console.error('Error fetching roles:', error)
      }
    }

    const fetchMenus = async () => {
      try {
        const response = await getAllMenus();
        console.log(" This is the response variable---", response)
        // const data = await response.json()
        setMenus(response)
      } catch (error) {
        console.error('Error fetching menus:', error)
      }
    }

    fetchRoles()
    fetchMenus()
  }, [])

  const handleSubmit = async () => {
    const permissions = {}

    menus.forEach(menu => {
      permissions[menu.ID] = { R: false, W: false, V: false }
    })

    selectedCheckbox.forEach(permission => {
      const [id, type] = permission.split('-')
      if (type === 'read') {
        permissions[id].R = true
      } else if (type === 'write') {
        permissions[id].W = true
      } else if (type === 'view') {
        permissions[id].V = true
      }
    })

    const payload = {
      id: editingRoleId,
      Name: roleName,
      Permission: permissions
    }

    try {
      if (editingRoleId) {
        const response = await updateRole(payload)
        console.log('Role updated successfully:', response)
        toast.success('Role updated successfully')
      } else {
        const response = await createRole(roleName, permissions)
        console.log('Role created successfully:', response)
        toast.success('Role created successfully')
      }
      handleClose()
      const fetchedRoles = await getRoles()
      setRoles(
        fetchedRoles.map(role => ({
          totalUsers: 10,
          title: role.name,
          id: role.id
        }))
      )
    } catch (error) {
      console.error('Error creating/updating role:', error)
      toast.error('Error creating/updating role')
    }
  }

  const handleEditRole = async id => {
    try {
      const roleData = await getRoleById(id)
      const role = roleData.Data.roles[0]
      setRoleName(role.name)
      setEditingRoleId(role.id)

      const permissions = []
      Object.keys(role.access_control).forEach(menuId => {
        const access = role.access_control[menuId]
        if (access.read_access) {
          permissions.push(`${menuId}-read`)
        }
        if (access.write_access) {
          permissions.push(`${menuId}-write`)
        }
        if (access.view_access) {
          permissions.push(`${menuId}-view`)
        }
      })

      setSelectedCheckbox(permissions)
      handleClickOpen()
      setDialogTitle('Edit')
    } catch (error) {
      console.error('Error fetching role details:', error)
      toast.error('Error fetching role details')
    }
  }

  const handleDeleteRole = async id => {
    const payload = { id }

    try {
      const response = await deleteRole(payload)
      console.log('Role deleted successfully:', response)
      toast.success('Role deleted successfully')

      setRoles(roles.filter(role => role.id !== id))
    } catch (error) {
      console.error('Error deleting role:', error)
      toast.error('Error deleting role')
    }
  }

  const renderCards = () =>
    roles.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card sx={{
          height: '100%',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[5]
          }
        }}>
          <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.totalUsers} users`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography
                  href='/'
                  variant='body2'
                  component={Link}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: 'primary.dark',
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={e => {
                    e.preventDefault()
                    handleEditRole(item.id)
                  }}
                >
                  Edit Role
                </Typography>
              </Box>
              <IconButton
                sx={{
                  color: 'text.primary',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: 'error.main',
                    backgroundColor: 'error.light'
                  }
                }}
                onClick={() => handleDeleteRole(item.id)}
              >
                <Icon fontSize={20} icon='bx:trash' />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{
            cursor: 'pointer',
            height: '100%',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme.shadows[5]
            }
          }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={4}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  width={88}
                  height={105}
                  alt='add-role'
                  src={`/images/pages/add-role-illustration-${theme.palette.mode}.png`}
                  style={{ marginBottom: -2 }}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Avatar
                  variant='rounded'
                  sx={{
                    mb: 2,
                    width: 48,
                    height: 48,
                    boxShadow: 3,
                    color: 'common.white',
                    backgroundColor: 'primary.main',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <Icon icon='bx:plus' />
                </Avatar>
                <Typography variant='h6'>Add Role</Typography>
                <Typography variant='body2' sx={{ textAlign: 'center' }}>
                  Add role, if it does not exist
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Dialog
        fullWidth
        open={open}
        maxWidth='sm'
        scroll='paper'
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh', // Limits the dialog height to 90% of viewport height
            margin: theme => theme.spacing(2),
            overflowY: 'auto', // Makes the dialog scrollable
            '::-webkit-scrollbar': {
              width: '8px'
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: theme => theme.palette.divider,
              borderRadius: '4px'
            }
          }
        }}
        TransitionProps={{
          onEntered: () => {
            if (editingRoleId) {
              // Fetch and set role data for editing
              const fetchRoleData = async () => {
                try {
                  const roleData = await getRoleById(editingRoleId)
                  const role = roleData.Data.roles[0]
                  setRoleName(role.name)

                  const permissions = []
                  Object.keys(role.access_control).forEach(menuId => {
                    const access = role.access_control[menuId]
                    if (access.read_access) {
                      permissions.push(`${menuId}-read`)
                    }
                    if (access.write_access) {
                      permissions.push(`${menuId}-write`)
                    }
                    if (access.view_access) {
                      permissions.push(`${menuId}-view`)
                    }
                  })

                  setSelectedCheckbox(permissions)
                } catch (error) {
                  console.error('Error fetching role details:', error)
                  toast.error('Error fetching role details')
                }
              }

              fetchRoleData()
            }
          }
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            p: theme => theme.spacing(4),
            backgroundColor: theme => theme.palette.background.default,
            color: theme => theme.palette.primary.main,
            fontWeight: 'bold'
          }}
        >
          {`${dialogTitle} Role`}
        </DialogTitle>

        <Divider />

        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(2)} !important`,
            px: theme => `${theme.spacing(4)} !important`,
            pt: theme => `${theme.spacing(4)} !important`
          }}
        >
          <Box sx={{ mb: 4 }}>
            <FormControl fullWidth>
              <TextField
                value={roleName}
                label='Role Name'
                placeholder='Enter Role Name'
                onChange={e => setRoleName(e.target.value)}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: 1
                  }
                }}
              />
            </FormControl>
          </Box>

          <Box sx={{ mb: 3, mt: 5 }}>
            <Typography
              variant='h6'
              sx={{
                color: theme => theme.palette.text.primary,
                fontWeight: 600,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '3px',
                  backgroundColor: theme => theme.palette.primary.main
                }
              }}
            >
              Role Permissions
            </Typography>
          </Box>

          <Paper elevation={0} variant="outlined" sx={{ mt: 4, borderRadius: 1 }}>
            <TableContainer sx={{ maxHeight: '50vh' }}>
              <Table stickyHeader size='small'>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme => theme.palette.background.default }}>
                    <TableCell
                      sx={{
                        borderRight: theme => `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme => theme.palette.background.default,
                        fontWeight: 'bold'
                      }}
                    >
                      Module
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: theme => `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme => theme.palette.background.default,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      Read
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: theme => `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme => theme.palette.background.default,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      Write
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: theme => theme.palette.background.default,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      View
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(menus) && menus.length > 0 ? (
                    menus.map((menu, index) => (
                      <TableRow key={index} sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                        },
                        '&:hover': {
                          backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                       }}
                        >
                        <TableCell sx={{ borderRight: theme => `1px solid ${theme.palette.divider}` }}>
                          {menu.Name}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: theme => `1px solid ${theme.palette.divider}`,
                            textAlign: 'center'
                          }}
                        >
                          <Checkbox
                            value={`${menu.ID}-read`}
                            onChange={() => togglePermission(`${menu.ID}-read`)}
                            checked={selectedCheckbox.includes(`${menu.ID}-read`)}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: theme => `1px solid ${theme.palette.divider}`,
                            textAlign: 'center'
                          }}
                        >
                          <Checkbox
                            value={`${menu.ID}-write`}
                            onChange={() => togglePermission(`${menu.ID}-write`)}
                            checked={selectedCheckbox.includes(`${menu.ID}-write`)}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Checkbox
                            value={`${menu.ID}-view`}
                            onChange={() => togglePermission(`${menu.ID}-view`)}
                            checked={selectedCheckbox.includes(`${menu.ID}-view`)}
                            color="primary"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 6, color: theme => theme.palette.text.secondary }}>
                        No menus available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{
            justifyContent: 'center',
            p: theme => `${theme.spacing(4)} !important`
          }}
        >
          <Button
            variant='contained'
            sx={{
              mr: 2,
              px: 4,
              py: 1,
              borderRadius: 1,
              boxShadow: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleClose}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 1,
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default RolesCards