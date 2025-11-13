import axios from 'axios'

const getTeam = async teamId => {
  const token = localStorage.getItem('accessToken')

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/team/get`,
      {
        ID: teamId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching team:', error)
    throw error
  }
}

export default getTeam
