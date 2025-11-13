import axios from 'axios';

const getAllDashboard = async (folderId) => {
  try {
    const accessToken = localStorage.getItem('accessToken'); 
    const response = await axios.get('http://localhost:8080/dashboard/getall', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        id: folderId, 
      },
    });

    if (response.data.code === 200) {
      return response.data.Data; 
    } else {
      console.error('Failed to fetch dashboards:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    return [];
  }
};

export default getAllDashboard;
