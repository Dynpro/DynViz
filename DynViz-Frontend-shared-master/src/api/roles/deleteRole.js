import axios from 'axios'

const deleteRole = async payload => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/role/delete?id=${payload.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting role:', error)
    throw error
  }
}

export default deleteRole
