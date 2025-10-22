// // ** React Imports
// import { useState } from 'react'

// // ** MUI Imports
// import Paper from '@mui/material/Paper'
// import Table from '@mui/material/Table'
// import TableRow from '@mui/material/TableRow'
// import TableHead from '@mui/material/TableHead'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TablePagination from '@mui/material/TablePagination'

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toLocaleString('en-US')
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toLocaleString('en-US')
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toFixed(2)
//   }
// ]
// function createData(name, code, population, size) {
//   const density = population / size

//   return { name, code, population, size, density }
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767)
// ]

// const DataPreview = () => {
//   // ** States
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(+event.target.value)
//     setPage(0)
//   }

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ maxHeight: '30vh' }}>
//         <Table stickyHeader aria-label='sticky table' size='small'>
//           <TableHead>
//             <TableRow>
//               {columns.map(column => (
//                 <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
//               return (
//                 <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
//                   {columns.map(column => {
//                     const value = row[column.id]

//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format && typeof value === 'number' ? column.format(value) : value}
//                       </TableCell>
//                     )
//                   })}
//                 </TableRow>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component='div'
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   )
// }

// export default DataPreview




//  modified by arman khan- to preview the result





// import { useState, useEffect } from 'react';
// import eventEmitter from 'src/utils/eventEmitter'
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableRow from '@mui/material/TableRow';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// const DataPreview = () => {
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     const handleQueryResult = (data) => {
//       setColumns(data.columns.map((col, index) => ({
//         id: index.toString(),
//         label: col,
//         minWidth: 170
//       })));
//       setRows(data.rows);
//     };

//     eventEmitter.on('queryResult', handleQueryResult);

//     return () => {
//       eventEmitter.off('queryResult', handleQueryResult); 
//     };
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ maxHeight: '30vh' }}>
//         <Table stickyHeader aria-label="sticky table" size="small">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} sx={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
//               <TableRow hover tabIndex={-1} key={rowIndex}>
//                 {columns.map((column, colIndex) => {
//                   const value = row[colIndex];
//                   return (
//                     <TableCell key={column.id}>
//                       {value}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default DataPreview;








//  Level - 1


// // src/components/DataPreview.js

// import { useState, useEffect } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableRow from '@mui/material/TableRow';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
// import emitter from 'src/utils/eventEmitter'; // Import the event emitter import eventEmitter from 'src/utils/eventEmitter'
// import getQueryResult from 'src/api/cells/getQueryResult'; // Import the API handler

// // Define your columns structure
// const DataPreview = () => {
//   // ** States
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);

//   // ** Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // ** Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   // ** Listen for event and fetch data (Added Code)
//   useEffect(() => {
//     const handleQueryEvent = async ({ connectionId, query, cellId }) => { 
//       console.log("got an event ---", connectionId, query, cellId )
//       try {
//         const data = await getQueryResult(connectionId, query, cellId);
//         console.log("this is data preview result---", data)
        
//         if (data && data.Data) {
//           setColumns(data.columns.map((column) => ({ id: column, label: column })));
//           setRows(data.rows);
//         }
//       } catch (error) {
//         console.error('Failed to load query result:', error);
//       }
//     };

//     emitter.on('runQuery', handleQueryEvent);

//     return () => {
//       emitter.off('runQuery', handleQueryEvent);
//     };
//   }, []);

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ maxHeight: '30vh' }}>
//         <Table stickyHeader aria-label='sticky table' size='small'>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} align='left' sx={{ minWidth: 170 }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
//               <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
//                 {columns.map((column) => (
//                   <TableCell key={column.id} align='left'>
//                     {row[columns.indexOf(column)]}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component='div'
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default DataPreview;



//  level - 2



import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import emitter from 'src/utils/eventEmitter'; // Import the event emitter
import getQueryResult from 'src/api/cells/getQueryResult'; // Import the API handler

const DataPreview = () => {
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // ** Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // ** Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // ** Listen for event and fetch data
  useEffect(() => {
    const handleQueryEvent = async ({ connectionId, query, cellId }) => { 
      console.log("Received event ---", connectionId, query, cellId);
      try {
        const data = await getQueryResult(connectionId, query, cellId);
        
        if (data) {
          setColumns(data.columns.map((column) => ({ id: column, label: column })));
          setRows(data.rows);
        }
      } catch (error) {
        console.error('Failed to load query result:', error);
      }
    };

    emitter.on('runQuery', handleQueryEvent);

    return () => {
      emitter.off('runQuery', handleQueryEvent);
    };
  }, []);

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '30vh' }}>
        <Table stickyHeader aria-label='sticky table' size='small'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align='left' sx={{ minWidth: 170 }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={column.id} align='left'>
                    {row[colIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DataPreview;
