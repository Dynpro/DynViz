
// import axios from 'axios';

// const getAllDataBlocks = async (id) => {
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     const response = await axios.get(`http://localhost:8080/datablock/getall`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         id,
//       },
//     });

//     return response.data.Data.datablocks;
//   } catch (error) {
//     console.error('Failed to fetch datablocks:', error);
//     return null;
//   }
// };

// export default getAllDataBlocks;



// adding filter concept




// import axios from 'axios';
// const getAllDataBlocks = async (id, filters = {}) => {
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     const response = await axios.post(`http://localhost:8080/datablock/getall`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         id,
//       },
//       data: {
//         TileID: id,
//         Filters: filters
//       }
//     });

//     return response.data.Data.datablocks;
//   } catch (error) {
//     console.error('Failed to fetch datablocks:', error);
//     return null;
//   }
// };


// export default getAllDataBlocks;





// temp




// import axios from 'axios';

// const getAllDataBlocks = async (id, filters = {}) => {
//   try {
//     const accessToken = localStorage.getItem('accessToken'); 

//     if (!accessToken) {
//       throw new Error('Access token is missing. Please log in again.');
//     }

//     const response = await axios.post(
//       `http://localhost:8080/datablock/getall?id=${id}`, 
//       {
//         TileID: id,
//         Filters: filters, 
//       },
//       {
//         headers: {
//            'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`, 
         
//         },
//       }
//     );

//     return response.data.Data.datablocks;
//   } catch (error) {
//     console.error('Failed to fetch datablocks:', error.response?.data || error.message);
//     return null;
//   }
// };

// export default getAllDataBlocks;



// temp-1


import axios from 'axios';

const getAllDataBlocks = async (id, filters = {}) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token is missing. Please log in again.');
    }

    
    const url = `http://localhost:8080/datablock/getall?id=${id}`;

    // Headers setup
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };

    
    const response = await axios.post(
      url, 
      {
        TileID: id,
        Filters: filters,
      },
      { headers } 
    );

    return response.data.Data.datablocks;
  } catch (error) {
    console.error('Failed to fetch datablocks:', error.response?.data || error.message);
    return null;
  }
};

export default getAllDataBlocks;
