import axios from 'axios';

const getAllVariables = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token is not available');
    }

    const response = await axios.get('http://localhost:8080/var/getall', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });

    if (response.status === 200 && response.data?.Data) {
      return response.data.Data;
    }

    throw new Error('Failed to fetch variables');
  } catch (error) {
    console.error('Error fetching variables:', error);
    throw error;
  }
};

export default getAllVariables;