// import React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

// const Loader = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '200px',
//       }}
//     >
//       <CircularProgress />
//     </Box>
//   );
// };

// export default Loader;




// fixing the issue for build

import React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
