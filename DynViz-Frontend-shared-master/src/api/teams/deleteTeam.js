import axios from 'axios'

const deleteTeam = async id => {
  const accessToken = localStorage.getItem('accessToken')
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/team/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: { id }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete team')
  }
}

export default deleteTeam
