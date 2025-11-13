import axios from 'axios';

export const getAllColumns = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`http://localhost:8080/utils/getallcolumns?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.Data.Data || [];
  } catch (error) {
    console.error('Error fetching columns:', error);
    throw error;
  }
};