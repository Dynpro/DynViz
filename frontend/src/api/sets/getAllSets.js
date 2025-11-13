import axios from 'axios';

const getAllSets = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is not available');
  }

  try {
    const response = await axios.get('http://localhost:8080/Set/getall', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200 && response.data?.Data) {
      return response.data.Data;
    } else {
      throw new Error('Failed to fetch sets data');
    }
  } catch (error) {
    console.error('Error fetching sets:', error);
    throw error;
  }
};

export default getAllSets;
