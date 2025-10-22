import axios from 'axios'

/**
 * Deletes a filter by its ID using a DELETE request
 * @param {number|string} id - The ID of the filter to be deleted
 * @returns {Promise} A promise that resolves with the deletion response
 */
const deleteFilterByID = async (id, DashboardID) => {
  try {
 
    const accessToken = localStorage.getItem('accessToken')

    
    if (!accessToken) {
      throw new Error('No access token found')
    }

  
    const response = await axios.put(
      `http://localhost:8080/filter/deletemapping`, 
      {
        "FilterID":parseInt(id,10),
        "DashboardID":parseInt(DashboardID,10)
      }, 
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    
    return response.data
  } catch (error) {
   
    console.error('Error deleting filter:', error)
    
    
    throw error
  }
}

export default deleteFilterByID