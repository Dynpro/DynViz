// src/api/data-model/getAllConnections.js
import axios from 'axios';

const getAllConnections = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from local storage
    const response = await axios.get('http://localhost:8080/connection/getall', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200 && response.data?.Data) {
      return response.data.Data; // Return the array of connections
    } else {
      throw new Error(response.data?.message || 'Failed to fetch connections');
    }
  } catch (error) {
    console.error('Error fetching connections:', error);
    throw error;
  }
};

export default getAllConnections;
