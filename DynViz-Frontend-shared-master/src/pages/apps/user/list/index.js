import { useState, useEffect, useCallback } from 'react';

// ** Next Imports
import Link from 'next/link';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { CardContent } from '@mui/material';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials';

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader';
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer';

// ** API Imports
import getUser from 'src/api/user/getUser';
import deleteUser from 'src/api/user/deleteUser';

// ** Vars
const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

// ** renders client column
const renderClient = (row) => {
  if (row.avatar && row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 32, height: 32 }} />;
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 32, height: 32, fontSize: '.875rem' }}
      >
        {getInitials(row.Name ? row.Name : 'John Doe')}
      </CustomAvatar>
    );
  }
};

const RowOptions = ({ id, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      handleRowOptionsClose();
    }
  };

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
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {/* <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/apps/user/view/account/${id}`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='bx:show' fontSize={20} />
          View
        </MenuItem> */}
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:pencil' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const UserList = () => {
  const [value, setValue] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUser();
        console.log("Fetched users:", fetchedUsers);  // Log fetched users for debugging
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      console.log("Deleting user with ID:", id);  // Log ID being deleted for debugging
      await deleteUser(id);
      // Remove user from state after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.ID !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const columns = [
    {
      flex: 0.25,
      minWidth: 240,
      field: 'Name',
      headerName: 'Name',
      renderCell: ({ row }) => {
        const { Name, Email } = row;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <LinkStyled href={`/apps/user/view/account/${row.ID}`}>{Name}</LinkStyled>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 240,
      field: 'Email',
      headerName: 'Email',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {row.Email}
          </Typography>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 160,
      field: 'PhoneNo',
      headerName: 'Phone',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {row.PhoneNo}
          </Typography>
        );
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.ID} onDelete={handleDeleteUser} />
    }
  ];

  return (
    <>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          User List
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Manage and view details of all users. Here you can add, edit, or delete users as needed.
        </Typography>
      </Box>

      <Grid container spacing={6} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
              <Divider sx={{ m: '0 !important' }} />
              <DataGrid
                autoHeight
                rows={users}
                columns={columns}
                getRowId={(row) => row.ID} // Specify the custom row ID
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </CardContent>
          </Card>
        </Grid>

        <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      </Grid>
    </>
  );
};

export default UserList;
