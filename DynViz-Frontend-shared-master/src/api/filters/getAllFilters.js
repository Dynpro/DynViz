// import axios from 'axios';

// const getAllFilters = async () => {
//   const accessToken = localStorage.getItem('accessToken');
//   const apiUrl = 'http://localhost:8080/filter/getall';

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.status === 200 && response.data?.Data) {
//       return response.data.Data;
//     } else {
//       console.error('Error fetching filters:', response.data?.message || 'Unknown error');
//       return [];
//     }
//   } catch (error) {
//     console.error('API call failed:', error.message);
//     return [];
//   }
// };

// export default getAllFilters;


// modified by arman khan


import axios from 'axios';

const getAllFilters = async () => {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from local storage
  if (!accessToken) throw new Error('Access token is missing.');

  const response = await axios.get('http://localhost:8080/filter/getall', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};

export default getAllFilters;
