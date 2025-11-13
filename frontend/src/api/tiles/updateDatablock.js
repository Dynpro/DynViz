import axios from 'axios'

const updateDatablock = async (payload) => {
  const accessToken = localStorage.getItem('accessToken')
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await axios.put('http://localhost:8080/datablock/update', payload, config)
    return response.data
  } catch (error) {
    console.error('Error updating datablocks:', error)
    throw error
  }
}

export default updateDatablock
