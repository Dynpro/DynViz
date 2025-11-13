// src/api/teams/updateTeam.js
import axios from 'axios'

const updateTeam = async (id, teamData) => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('No access token found')
  }

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/team/update?id=${id}`

  try {
    const response = await axios.put(url, teamData, config)
    return response.data
  } catch (error) {
    console.error('Error updating team:', error)
    throw error
  }
}

export default updateTeam
