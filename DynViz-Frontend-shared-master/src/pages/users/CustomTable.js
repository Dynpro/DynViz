// // ** React Imports
// import { useState } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import { DataGrid } from '@mui/x-data-grid'

// // ** Custom Components
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'
// import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// // ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// // ** Dummy Data
// const dummyData = [
//   { id: 1, full_name: 'John Doe', email: 'johndoe@example.com', start_date: '2023-08-01', salary: '$5000', age: 30, status: 1, avatar: '' },
//   { id: 2, full_name: 'Jane Smith', email: 'janesmith@example.com', start_date: '2023-07-15', salary: '$5500', age: 25, status: 2, avatar: 'avatar2.png' },
//   { id: 3, full_name: 'Alice Johnson', email: 'alicejohnson@example.com', start_date: '2023-06-20', salary: '$6000', age: 35, status: 3, avatar: '' },
//   // Add more dummy data as needed
// ]

// // ** Renders client column
// const renderClient = params => {
//   const { row } = params
//   const stateNum = Math.floor(Math.random() * 6)
//   const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
//   const color = states[stateNum]
//   if (row.avatar.length) {
//     return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
//   } else {
//     return (
//       <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
//         {getInitials(row.full_name ? row.full_name : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

// const statusObj = {
//   1: { title: 'current', color: 'primary' },
//   2: { title: 'professional', color: 'success' },
//   3: { title: 'rejected', color: 'error' },
//   4: { title: 'resigned', color: 'warning' },
//   5: { title: 'applied', color: 'info' }
// }

// const escapeRegExp = value => {
//   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
// }

// const columns = [
//   {
//     flex: 0.275,
//     minWidth: 290,
//     field: 'full_name',
//     headerName: 'Name',
//     renderCell: params => {
//       const { row } = params

//       return (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           {renderClient(params)}
//           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
//               {row.full_name}
//             </Typography>
//             <Typography noWrap variant='caption'>
//               {row.email}
//             </Typography>
//           </Box>
//         </Box>
//       )
//     }
//   },
//   {
//     flex: 0.2,
//     type: 'date',
//     minWidth: 120,
//     headerName: 'Date',
//     field: 'start_date',
//     valueGetter: params => new Date(params.value),
//     renderCell: params => (
//       <Typography variant='body2' sx={{ color: 'text.primary' }}>
//         {params.row.start_date}
//       </Typography>
//     )
//   },
//   {
//     flex: 0.2,
//     minWidth: 110,
//     field: 'salary',
//     headerName: 'Salary',
//     renderCell: params => (
//       <Typography variant='body2' sx={{ color: 'text.primary' }}>
//         {params.row.salary}
//       </Typography>
//     )
//   },
//   {
//     flex: 0.125,
//     field: 'age',
//     minWidth: 80,
//     headerName: 'Age',
//     renderCell: params => (
//       <Typography variant='body2' sx={{ color: 'text.primary' }}>
//         {params.row.age}
//       </Typography>
//     )
//   },
//   {
//     flex: 0.2,
//     minWidth: 140,
//     field: 'status',
//     headerName: 'Status',
//     renderCell: params => {
//       const status = statusObj[params.row.status]

//       return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />
//     }
//   }
// ]

// const CustomTable = () => {
//   // ** States
//   const [data] = useState(dummyData)
//   const [searchText, setSearchText] = useState('')
//   const [filteredData, setFilteredData] = useState([])
//   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

//   const handleSearch = searchValue => {
//     setSearchText(searchValue)
//     const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

//     const filteredRows = data.filter(row => {
//       return Object.keys(row).some(field => {
//         // @ts-ignore
//         return searchRegex.test(row[field].toString())
//       })
//     })
//     if (searchValue.length) {
//       setFilteredData(filteredRows)
//     } else {
//       setFilteredData([])
//     }
//   }

//   return (
//     <Card>
//       <CardHeader title='' />
//       <DataGrid
//         autoHeight
//         columns={columns}
//         pageSizeOptions={[7, 10, 25, 50]}
//         paginationModel={paginationModel}
//         slots={{ toolbar: QuickSearchToolbar }}
//         onPaginationModelChange={setPaginationModel}
//         rows={filteredData.length ? filteredData : data}
//         slotProps={{
//           baseButton: {
//             variant: 'outlined'
//           },
//           toolbar: {
//             value: searchText,
//             clearSearch: () => handleSearch(''),
//             onChange: event => handleSearch(event.target.value)
//           }
//         }}
//       />
//     </Card>
//   )
// }

// export default CustomTable










//  modified by arman khan




// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip';
import CustomAvatar from 'src/@core/components/mui/avatar';
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar';

// ** Icons Imports
import DotsVertical from '@mui/icons-material/MoreVert';

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials';

// ** Dummy Data
const dummyData = [
  { id: 1, full_name: 'John Doe', email: 'johndoe@example.com', phone: '+1 (123) 456-7890', role: 'Admin', status: 1, avatar: '' },
  { id: 2, full_name: 'Jane Smith', email: 'janesmith@example.com', phone: '+1 (987) 654-3210', role: 'Editor', status: 2, avatar: 'avatar2.png' },
  { id: 3, full_name: 'Alice Johnson', email: 'alicejohnson@example.com', phone: '+1 (555) 123-4567', role: 'Viewer', status: 3, avatar: '' },
  // Add more dummy data as needed
];

// ** Renders client column
const renderClient = params => {
  const { row } = params;
  const stateNum = Math.floor(Math.random() * 6);
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary'];
  const color = states[stateNum];
  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />;
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    );
  }
};

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
};

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const CustomTable = () => {
  // ** States
  const [data] = useState(dummyData);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  // ** Handlers
  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handleSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  // ** Columns
  const columns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Name',
      renderCell: params => {
        const { row } = params;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.full_name}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'email',
      headerName: 'Email',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.email}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'phone',
      headerName: 'Phone No.',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.phone}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'role',
      headerName: 'Role',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.role}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: params => {
        const status = statusObj[params.row.status];

        return <CustomChip rounded size='small' skin='light' color={status.color} label={status.title} />;
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'actions',
      headerName: 'Action',
      renderCell: params => (
        <>
          <IconButton
            size='small'
            onClick={event => handleMenuOpen(event, params.row.id)}
          >
            <DotsVertical />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuRowId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          </Menu>
        </>
      )
    }
  ];

  return (
    <Card>
      <CardHeader title='' />
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value),
            customActions: (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Button variant='contained' color='primary' onClick={() => alert('Add User clicked')} sx={{ mr: 2 }}>
                  Add User
                </Button>
              </Box>
            )
          }
        }}
      />
    </Card>
  );
};

export default CustomTable;
