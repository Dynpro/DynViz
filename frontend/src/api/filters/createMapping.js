// import axios from 'axios';

// const createMapping = async (dashboardID, filterID, dataBlockID) => {
//   try {
//     const accessToken = localStorage.getItem('accessToken');
//     const response = await axios.post(
//       'http://localhost:8080/filter/mapping',
//       {
//         DashboardID: dashboardID,
//         FilterID: filterID,
//         DataBlockID: dataBlockID,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error.message;
//   }
// };

// export default createMapping;



//  modified by arman khan


import axios from 'axios';

const createMapping = async (dashboardId, filterId, dataBlockIds) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token not found.');
  }

  const payload = {
    DashboardID: dashboardId,
    FilterID: filterId,
    DataBlockID: dataBlockIds,
  };

  try {
    const response = await axios.post('http://localhost:8080/filter/mapping', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create mapping.' };
  }
};

export default createMapping;
