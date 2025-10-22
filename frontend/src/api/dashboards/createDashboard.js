

import axios from 'axios';

const createDashboard = async (name, folderId, projectId) => {
  const token = localStorage.getItem('accessToken');
  
  const payload = {
    Name: name,
    Description: 'Creating dashboard for testing',
    FolderID: parseInt(folderId, 10), 
    ProjectID: parseInt(projectId, 10), 
  };

  try {
    const response = await axios.post(
      'http://localhost:8080/dashboard/create',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating dashboard:', error);
    throw error;
  }
};

export default createDashboard;
