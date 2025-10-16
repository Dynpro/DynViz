// import axios from 'axios';

// const getAllDropDownValues = async (columnId) => {
//   try {
//     const accessToken = localStorage.getItem('accessToken'); // Get token from local storage
//     const response = await axios.get('http://localhost:8080/utils/getallvalues', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         id: columnId,
//       },
//     });
//     if (response.data?.Data?.rows) {
//       console.log("this is the dropdown value---", response.data.Data.Data)
//       return response.data.Data.rows.map(row => row[0]); // Extract rows values

//     } else {
//       throw new Error('Invalid API response structure');
//     }
//   } catch (error) {
//     console.error('Error fetching dropdown values:', error);
//     return [];
//   }
// };

// export default getAllDropDownValues;



//  modified by arman khan




import axios from 'axios';

const getAllDropDownValues = async (columnId) => {
  try {
    const accessToken = localStorage.getItem('accessToken'); // Get token from local storage
    const response = await axios.get('http://localhost:8080/utils/getallvalues', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        id: columnId,
      },
    });
    // Navigate the nested structure to get rows
    const rows = response.data?.Data?.Data?.rows;
    if (rows) {
      return rows.map(row => row[0]); // Extract the first value of each row
    } else {
      throw new Error('Invalid API response structure');
    }
  } catch (error) {
    console.error('Error fetching dropdown values:', error);
    return [];
  }
};

export default getAllDropDownValues;
