import axios from 'axios'

const getUser = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('No access token found')
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data && response.data.Data) {
      // Filter active users
      const activeUsers = response.data.Data.filter(user => user.Status === 1)
      return activeUsers
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export default getUser
