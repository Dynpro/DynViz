import axios from 'axios';

const updateFilterINDataModel = async (id, payload, accessToken) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/filter/update?id=${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export default updateFilterINDataModel;