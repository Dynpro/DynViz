
import axios from 'axios'

const getMappingOfDatablocksInTiles = async (filterId, dashboardId) => {
  const accessToken = localStorage.getItem('accessToken') 
  try {
    const response = await axios.post(
      'http://localhost:8080/filter/getmapping',
      {
        FilterID: filterId,
        DashboardID: parseInt(dashboardId,10)
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data.code === 200) {
      return response.data.Data 
    } else {
      throw new Error(response.data.message || 'Failed to fetch mappings')
    }
  } catch (error) {
    console.error('Error fetching datablock mappings:', error)
    throw error
  }
}

export default getMappingOfDatablocksInTiles