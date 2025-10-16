import axios from 'axios';

const getAllFiltersBySetID = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    
    const response = await axios.get(
      `http://localhost:8080/filter/getfiltersbySetID?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch filters');
  }
};

export default getAllFiltersBySetID;
