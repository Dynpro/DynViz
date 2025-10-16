import axios from 'axios';

const getAllVariables = async (id) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token not found');
  }

  try {
    const response = await axios.get(`http://localhost:8080/var/getall`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching variables:', error);
    throw error;
  }
};

export default getAllVariables;
