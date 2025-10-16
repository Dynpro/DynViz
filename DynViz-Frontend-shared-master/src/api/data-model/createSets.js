// src/api/data-model/createSets.js
import axios from 'axios';

const createSet = async (name, schemaID, connectionID) => {
  const accessToken = localStorage.getItem('accessToken');
  
  const body = {
    Name: name,
    SchemaID: schemaID,
    ConnectionID: connectionID,
  };

  try {
    const response = await axios.post(
      'http://localhost:8080/Set/create',
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating set:', error);
    throw error;
  }
};

export default createSet;
