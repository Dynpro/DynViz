

// import axios from 'axios';


// export const getAllTemplateID = async () => {
//   try {
  
//     const accessToken = localStorage.getItem('accessToken');

//     const response = await axios.get('http://localhost:8080/TemplateMaster/getall', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

    
//     return response.data.Data;
//   } catch (error) {
    
//     console.error('Error fetching template IDs:', error);
//     return [];
//   }
// };



//  Dashboard Task - 5



// src/api/dashboards/getAllTemplateID.js
import axios from 'axios';

// Function to get all template IDs
export const getAllTemplateIDs = async () => {
  try {
    // Get the access token from local storage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Access token is missing');
    }

    // Make the API call to fetch template IDs
    const response = await axios.get('http://localhost:8080/TemplateMaster/getall', {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token to the request headers
      },
    });

    // Return the data if the API call is successful
    if (response.data && response.data.code === 200) {
      return response.data.Data;
    } else {
      throw new Error('Failed to fetch template IDs');
    }
  } catch (error) {
    console.error('Error fetching template IDs:', error);
    return [];
  }
};
