import axios from 'axios';

const refreshDBConnection = async () => {
  try {
   
    const accessToken = window.localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found in local storage.');
    }

    
    const response = await axios.get(
      'http://localhost:8080/connection/Refresh',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    
    return response.data;
  } catch (error) {
    console.error('Error refreshing DB connection:', error);
    throw error; 
  }
};

export default refreshDBConnection;