import axios from 'axios'

const getConnection = async id => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/connection/get?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching connection:', error)
    throw error
  }
}

export default getConnection
