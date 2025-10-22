import axios from 'axios'

const getAllSetsForEditor = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Set/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching connections:', error)
    throw error
  }
}

export default getAllSetsForEditor
