import axios from 'axios'

const getUsersByTeam = async teamId => {
  const token = localStorage.getItem('accessToken')

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getbyteam`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        id: teamId
      }
    })

    return response.data
  } catch (error) {
    console.error('Failed to fetch users by team:', error)
    throw error
  }
}

export default getUsersByTeam
