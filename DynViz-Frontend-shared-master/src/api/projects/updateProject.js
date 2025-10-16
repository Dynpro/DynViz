import axios from 'axios'

const updateProject = async (id, projectName) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('No access token found')
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/update?id=${id}`,
      { Name: projectName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to update project:', error)
    throw error
  }
}

export default updateProject
