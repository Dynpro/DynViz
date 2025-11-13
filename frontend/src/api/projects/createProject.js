import axios from 'axios'

const createProject = async projectName => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/create`,
      {
        Name: projectName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.data.code !== 201) {
      throw new Error(response.data.message || 'Failed to create project')
    }

    return response.data
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export default createProject
