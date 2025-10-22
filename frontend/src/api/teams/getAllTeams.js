import axios from 'axios'

const getAllTeams = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/team/getall`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data.Data
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
}

export default getAllTeams
