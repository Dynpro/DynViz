import axios from 'axios'

const createRoleById = async id => {
  const accessToken = localStorage.getItem('accessToken')
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/role/get?id=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching role by ID:', error)
    throw error
  }
}

export default createRoleById
