import axios from 'axios';

const getAllValuesForFilterInModel = async (columnId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    
    const response = await axios.get(
      `http://localhost:8080/utils/getallvalues?id=${columnId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract the rows from nested Data structure
    const values = response.data.Data.Data.rows.map(row => row[0]);
    return values;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch filter values');
  }
};

export default getAllValuesForFilterInModel;
