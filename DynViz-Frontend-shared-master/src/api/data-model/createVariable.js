// src/api/data-model/createVariable.js
import axios from 'axios';

const createVariable = async (setID, connectionID) => {
  const accessToken = localStorage.getItem('accessToken'); 

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const payload = {
    SetID: setID,
    IsCustom: 'false', 
    ConnectionID: connectionID,
  };

  try {
    const response = await axios.post('http://localhost:8080/var/create', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating variables:', error);
    throw error; 
  }
};

export default createVariable;
