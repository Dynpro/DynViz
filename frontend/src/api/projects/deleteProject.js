import axios from 'axios'

const deleteProject = async id => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('No access token found')
  }

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/project/delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to delete project:', error)
    throw error
  }
}

export default deleteProject
