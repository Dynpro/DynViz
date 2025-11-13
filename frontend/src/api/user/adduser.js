import axios from 'axios'

const addUser = async (userData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/add`, userData, config)
    return response.data.message
  } catch (error) {
    throw error.response.data
  }
}

export default addUser
