




//  modified by arman khan






// // ** React Imports
// import { useEffect, useCallback, useState } from 'react'

// // ** Next Import
// import Link from 'next/link'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import { DataGrid } from '@mui/x-data-grid'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'

// // ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// // ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// // ** Actions Imports
// import { fetchData } from 'src/store/apps/user'

// // ** Custom Components Imports
// import TableHeader from 'src/views/apps/roles/TableHeader'

// // ** API Import
// import getRoles from 'src/api/roles/getRoles'
// import getUser from 'src/api/user/getUser'
// import deleteUser from 'src/api/user/deleteUser' // Ensure this import is correct

// // ** Vars
// const userRoleObj = {
//   admin: { icon: 'bx:mobile-alt', color: 'error' },
//   author: { icon: 'bx:cog', color: 'warning' },
//   maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
//   editor: { icon: 'bx:edit', color: 'info' },
//   subscriber: { icon: 'bx:user', color: 'primary' }
// }

// const userStatusObj = {
//   active: 'success',
//   pending: 'warning',
//   inactive: 'secondary'
// }

// // ** renders client column
// // const renderClient = row => {
// //   if (row.avatar.length) {
// //     return <CustomAvatar src={row.avatar} sx={{ mr: 4, width: 30, height: 30 }} />
// //   } else {
// //     return (
// //       <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 4, width: 30, height: 30, fontSize: '0.875rem' }}>
// //         {getInitials(row.fullName ? row.fullName : 'John Doe')}
// //       </CustomAvatar>
// //     )
// //   }
// // }

// const RowOptions = ({ id, onDelete }) => {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const rowOptionsOpen = Boolean(anchorEl)

//   const handleRowOptionsClick = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleRowOptionsClose = () => {
//     setAnchorEl(null)
//   }

//   const handleDelete = async () => {
//     try {
//       await onDelete(id)
//     } catch (error) {
//       console.error('Error deleting user:', error)
//     } finally {
//       handleRowOptionsClose()
//     }
//   }

//   return (
//     <>
//       <IconButton size='small' onClick={handleRowOptionsClick}>
//         <Icon icon='bx:dots-vertical-rounded' />
//       </IconButton>
//       <Menu
//         keepMounted
//         anchorEl={anchorEl}
//         open={rowOptionsOpen}
//         onClose={handleRowOptionsClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right'
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right'
//         }}
//         PaperProps={{ style: { minWidth: '8rem' } }}
//       >
//         <MenuItem
//           component={Link}
//           sx={{ '& svg': { mr: 2 } }}
//           href={`/apps/user/view/account/${id}`}
//           onClick={handleRowOptionsClose}
//         >
//           <Icon icon='bx:show' fontSize={20} />
//           View
//         </MenuItem>
//         <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon='bx:pencil' fontSize={20} />
//           Edit
//         </MenuItem>
//         <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon='bx:trash-alt' fontSize={20} />
//           Delete
//         </MenuItem>
//       </Menu>
//     </>
//   )
// }

// const UserList = () => {
//   // ** State
//   const [plan, setPlan] = useState('')
//   const [value, setValue] = useState('')
//   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
//   const [roles, setRoles] = useState([])
//   const [users, setUsers] = useState([])
//   const [selectedUsers, setSelectedUsers] = useState([])

//   // ** Hooks
//   const dispatch = useDispatch()
//   const store = useSelector(state => state.user)

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const fetchedRoles = await getRoles()
//         // console.log('Fetched Roles:', fetchedRoles) // Log fetched users for debugging
//         setRoles(fetchedRoles)
//       } catch (error) {
//         console.error('Error fetching users:', error)
//       }
//     }
//     const fetchUsers = async () => {
//       try {
//         const fetchedUsers = await getUser()
//         console.log('Fetched users:', fetchedUsers) // Log fetched users for debugging
//         setUsers(fetchedUsers)
//       } catch (error) {
//         console.error('Error fetching users:', error)
//       }
//     }

//     fetchRoles()
//     fetchUsers()
//   }, [])

//   const handleDeleteUser = async id => {
//     try {
//       console.log('Deleting user with ID:', id) // Log ID being deleted for debugging
//       await deleteUser(id)
//       // Remove user from state after deletion
//       setUsers(prevUsers => prevUsers.filter(user => user.ID !== id))
//     } catch (error) {
//       console.error('Error deleting user:', error)
//     }
//   }

//   const handleFilter = useCallback(val => {
//     setValue(val)
//   }, [])

//   const handlePlanChange = useCallback(e => {
//     setPlan(e.target.value)
//   }, [])

//   const handleSelectionChange = ids => {
//     setSelectedUsers(ids)
//   }

//   const columns = [
//     {
//       flex: 0.2,
//       minWidth: 230,
//       field: 'ID',
//       headerName: 'Id',
//       renderCell: ({ row }) => {
//         const { ID, id } = row

//         return (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             {/* {renderClient(row)} */}
//             <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
//               <Typography
//                 noWrap
//                 component={Link}
//                 href='/apps/user/view/account/'
//                 sx={{
//                   fontWeight: 600,
//                   color: 'text.secondary',
//                   textDecoration: 'none',
//                   '&:hover': { color: 'primary.main' }
//                 }}
//               >
//                 {ID}
//               </Typography>
//               {/* <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
//                 {`${ID}`}
//               </Typography> */}
//             </Box>
//           </Box>
//         )
//       }
//     },
//     {
//       flex: 0.2,
//       minWidth: 250,
//       field: 'Name',
//       headerName: 'Name',
//       renderCell: ({ row }) => {
//         return (
//           <Typography noWrap sx={{ color: 'text.secondary' }}>
//             {row.Name}
//           </Typography>
//         )
//       }
//     },
//     {
//       flex: 0.2,
//       minWidth: 250,
//       field: 'Email',
//       headerName: 'EMAIL',
//       renderCell: ({ row }) => {
//         return (
//           <Typography noWrap sx={{ color: 'text.secondary' }}>
//             {row.Email}
//           </Typography>
//         )
//       }
//     },
//     {
//       flex: 0.2,
//       minWidth: 250,
//       field: 'Role',
//       headerName: 'ROLE',
//       renderCell: ({ row }) => {
//         return (
//           <Typography noWrap sx={{ color: 'text.secondary' }}>
//             {row.Role}
//           </Typography>
//         )
//       }
//     },
//     {
//       flex: 0.2,
//       minWidth: 250,
//       field: 'Team',
//       headerName: 'TEAM',
//       renderCell: ({ row }) => {
//         return (
//           <Typography noWrap sx={{ color: 'text.secondary' }}>
//             {row.Team}
//           </Typography>
//         )
//       }
//     },
//     {
//       flex: 0.1,
//       minWidth: 90,
//       sortable: false,
//       field: 'actions',
//       headerName: 'Actions',
//       renderCell: ({ row }) => <RowOptions id={row.ID} onDelete={handleDeleteUser} />
//     }
//   ]

//   return (
//     <Grid container spacing={6}>
//       <Grid item xs={12}>
//         <Card>
//           <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
//           <DataGrid
//             autoHeight
//             rows={users}
//             columns={columns}
//             getRowId={row => row.ID}
//             disableRowSelectionOnClick
//             checkboxSelection
//             onSelectionModelChange={handleSelectionChange}
//             pageSizeOptions={[10, 25, 50]}
//             paginationModel={paginationModel}
//             onPaginationModelChange={setPaginationModel}
//           />
//         </Card>
//       </Grid>
//     </Grid>
//   )
// }

// export default UserList






//  temporary change for uac 




//  final temporary change --- this is the main code 


// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'

// ** API Import
import getRoles from 'src/api/roles/getRoles'
import getUser from 'src/api/user/getUser'
import deleteUser from 'src/api/user/deleteUser'

// ** Vars
const userRoleObj = {
  admin: { icon: 'bx:mobile-alt', color: 'error' },
  author: { icon: 'bx:cog', color: 'warning' },
  maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
  editor: { icon: 'bx:edit', color: 'info' },
  subscriber: { icon: 'bx:user', color: 'primary' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const RowOptions = ({ id, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    onDelete(id);
    handleRowOptionsClose();
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='bx:dots-vertical-rounded' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem component={Link} href={`/apps/user/view/${id}`}>
          <Icon icon='bx:show' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  useEffect(() => {
    dispatch(
      fetchData({
        role: '',
        q: value,
      })
    )
  }, [dispatch, value])

  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      try {
        const fetchedRoles = await getRoles();
        const fetchedUsers = await getUser();
        setRoles(fetchedRoles);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching roles or users:', error);
      }
    };

    fetchRolesAndUsers();
  }, []);

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      // Your logic to handle the save action after roles are assigned
      fetchUsers(); // Refetch the users
      handleModalClose();
    } catch (error) {
      console.error('Error assigning roles:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers(); // Refetch the users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleRowClick = (params) => {
    console.log('Row clicked:', params);
  };

  const handleSelectionChange = (selection) => {
    setSelectedUsers(selection);
  };

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUser();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const columns = [
    {
      flex: 0.1,
      field: 'ID',
      minWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.15,
      field: 'Name',
      minWidth: 150,
      headerName: 'Name',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.Name}
        </Typography>
      )
    },
    {
      flex: 0.15,
      field: 'Email',
      minWidth: 200,
      headerName: 'Email',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.Email}
        </Typography>
      )
    },
    {
      flex: 0.15,
      field: 'Role',
      minWidth: 200,
      headerName: 'Role',
      renderCell: ({ row }) => (
        <Typography noWrap variant='body2'>
          {row.Role}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'Status',
      minWidth: 100,
      headerName: 'Status',
      renderCell: ({ row }) => (
        <CustomChip
          skin='light'
          size='small'
          label={row.Status}
          color={userStatusObj[row.Status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    },
    {
      flex: 0.1,
      field: 'Actions',
      minWidth: 100,
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.ID} onDelete={handleDelete} />
    }
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            plan={plan}
            value={value}
            handleFilter={handleFilter}
            handlePlanChange={handlePlanChange}
            handleSave={handleSave} // Pass handleSave to TableHeader
          />
          <DataGrid
            autoHeight
            rows={users}
            columns={columns}
            getRowId={row => row.ID}
            disableRowSelectionOnClick
            checkboxSelection
            onSelectionModelChange={handleSelectionChange}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList;




