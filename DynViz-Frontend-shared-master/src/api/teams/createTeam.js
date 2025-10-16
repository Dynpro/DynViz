import axios from 'axios'

const createTeam = async teamData => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/team/create`, teamData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Failed to create team')
  }
}

export default createTeam
