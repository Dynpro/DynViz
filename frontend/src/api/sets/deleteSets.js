import axios from 'axios';

const deleteSet = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const response = await axios.put(
      `http://localhost:8080/Set/delete?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting the set:', error);
    throw new Error('Error in deleting the sets');
  }
};

export default deleteSet;
