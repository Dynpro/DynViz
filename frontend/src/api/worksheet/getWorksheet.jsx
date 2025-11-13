import axios from 'axios'

const getWorksheet = async () => {
  var allWorksheets = null
  const token = localStorage.getItem('accessToken')
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/worksheet/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data.code !== 200) {
      throw new Error(response.data.message || 'Failed to fetch projects')
    }

    allWorksheets = response.data.Data

    console.warn(allWorksheets)
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }

  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/worksheet/get/${allWorksheets[1]['id']}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.data.code === 200) {
      return response.data.Data
    } else {
      console.error('Failed to fetch dashboards:', response.data.message)
      return []
    }
  } catch (error) {
    console.error('Error fetching dashboards:', error)
    return []
  }
}

export default getWorksheet
