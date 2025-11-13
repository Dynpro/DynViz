

// import axios from 'axios';

// const getFilterDropdownOptions = async (columnID) => {
//   const accessToken = localStorage.getItem('accessToken');
//   const url = `http://localhost:8080/utils/getallvalues?id=${columnID}`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     });

//     if (response.data.code === 200) {
//       return response.data.Data.Data.rows.map(row => row[0]);
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     console.error('Error fetching filter dropdown options:', error);
//     return [];
//   }
// };

// export default getFilterDropdownOptions;




import axios from 'axios';

// Function to fetch dropdown options for a filter
export const getFilterDropdownOptions = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(`http://localhost:8080/utils/getallvalues`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { id },
    });
    
    if (response.data && response.data.Data && response.data.Data.Data.rows) {
      return response.data.Data.Data.rows.map((row) => row[0]); // Extract rows
    } else {
      console.error('Invalid API response format', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching dropdown options:', error);
    return [];
  }
};
