import axios from 'axios'

const getAllWorksheets = async () => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/project/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data.code !== 200) {
      throw new Error(response.data.message || 'Failed to fetch projects')
    }

    return response.data.Data
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export default getAllWorksheets
