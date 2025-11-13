// src/api/tiles/deleteTiles.js

import axios from 'axios'

const deleteTile = async (tileId) => {
  const accessToken = localStorage.getItem('accessToken')
  
  if (!accessToken) {
    throw new Error('Access token is missing')
  }

  try {
    const response = await axios.delete(`http://localhost:8080/tile/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: tileId
      }
    })
    
    return response.data
  } catch (error) {
    console.error('Error deleting tile:', error)
    throw error
  }
}

export default deleteTile
