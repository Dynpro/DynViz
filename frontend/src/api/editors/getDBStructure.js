import axios from 'axios'

const getDBStructure = async (connectionId) => {
  try {
 
    const accessToken = localStorage.getItem('accessToken')
    

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: connectionId 
      }
    }

    
    const response = await axios.get('http://localhost:8080/DBStructure/Getdb', config)
    
   
    if (response.status === 200) {
      return response.data.structure 
    } else {
      console.error('Failed to fetch DB structure:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('Error fetching DB structure:', error)
    return null
  }
}

export default getDBStructure
