// import axios from 'axios';

// // Function to fetch all tiles for a given dashboard ID
// const getAllTiles = async (dashboardId) => {
//   try {
//     const accessToken = localStorage.getItem('accessToken'); // Get the access token from local storage

//     // Make the API call with the access token and dashboard ID
//     const response = await axios.get('http://localhost:8080/tile/getall', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         id: dashboardId,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching tiles:', error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

// export default getAllTiles;





//  Dashboard task - 10



import axios from 'axios';

const getAllTiles = async (dashboardId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `http://localhost:8080/tile/getall`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          id: dashboardId,
        },
      }
    );
    
    return response.data.Data;
  } catch (error) {
    console.error('Error fetching tiles:', error);
    return [];
  }
};

export default getAllTiles;
