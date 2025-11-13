import axios from 'axios'

const getOrganizationDetails = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const orgId = localStorage.getItem('orgId')
    if (!accessToken) throw new Error('No access token found in local storage')
    if (!orgId) throw new Error('No organization ID found in local storage')

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/organization/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: orgId
      }
    })

    return response.data.Data
  } catch (error) {
    console.error('Error fetching organization data:', error)
    throw error
  }
}

export default getOrganizationDetails
