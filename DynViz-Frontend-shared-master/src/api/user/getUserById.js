// src/api/user/getUserById.js

import axios from 'axios';

const getUserById = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  if (!accessToken || !userId) {
    throw new Error('Access token or user ID not found in local storage');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  const body = {
    ID: [parseInt(userId, 10)],
  };

  const response = await axios.post('http://localhost:8080/user/get', body, config);
  return response.data;
};

export default getUserById;
