

// import axios from 'axios';

// const createTile = async (cardId, dashboardId, projectId) => {
//   const accessToken = localStorage.getItem('accessToken');
  
//   if (!accessToken) {
//     throw new Error('No access token found');
//   }

//   const config = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//     },
//   };

//   const payload = {
//     DashboardID: parseInt(dashboardId,10),
//     ProjectID: parseInt(projectId,10),
//   };

//   try {
//     const response = await axios.post(`http://localhost:8080/TemplateMaster/get/${cardId}`, payload, config);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating tile:', error);
//     throw error;
//   }
// };

// export default createTile;



//  dashboard task - 7 ( create tile api binding)



import axios from 'axios';

const createTile = async (cardId, dashboardId, projectId) => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  const payload = {
    DashboardID: parseInt(dashboardId, 10),
    ProjectID: parseInt(projectId, 10),
  };

  try {
    const response = await axios.post(`http://localhost:8080/TemplateMaster/get/${cardId}`, payload, config);
    return response.data;
  } catch (error) {
    console.error('Error creating tile:', error);
    throw error;
  }
};

export default createTile;
