import axios from 'axios'

const getAllConnections = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/connection/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching connections:', error)
    throw error
  }
}

export default getAllConnections
