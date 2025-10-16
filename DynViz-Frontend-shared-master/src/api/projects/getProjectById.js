import axios from 'axios'

const getProjectById = async projectId => {
  const accessToken = localStorage.getItem('accessToken')
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/project/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      params: { id: projectId }
    })

    console.log('response data---', response.data.Data)
    if (response.data.code === 200) {
      return response.data.Data
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    throw error
  }
}

export default getProjectById
