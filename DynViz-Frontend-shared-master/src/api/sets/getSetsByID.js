// src/api/sets/getSetsByID.js

import axios from 'axios';

const getSetsByID = async (id) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const response = await axios.get('http://localhost:8080/Set/get', {
      params: { id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.code === 200) {
      const { Name, ID, SchemaID } = response.data.Data;
      return { Name, ID, SchemaID };
    } else {
      throw new Error(response.data.message || 'Failed to fetch set');
    }
  } catch (error) {
    throw new Error(error.message || 'An error occurred while fetching the set');
  }
};

export default getSetsByID;
