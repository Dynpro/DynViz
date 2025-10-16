

import axios from 'axios';

const getTileByID = async (id) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(`http://localhost:8080/tile/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        id,
      },
    });

    if (response.data.code === 200) {
        // console.log("Api response of tile ---", response.data.Data[0])
      return response.data.Data[0];
    } else {
      throw new Error(`Error: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error fetching tile by ID:', error);
    return null;
  }
};

export default getTileByID;
