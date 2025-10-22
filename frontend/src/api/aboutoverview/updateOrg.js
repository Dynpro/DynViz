import axios from 'axios'

const updateOrganizationDetails = async data => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const orgId = localStorage.getItem('orgId')

    if (!accessToken) throw new Error('No access token found in local storage')
    if (!orgId) throw new Error('No organization ID found in local storage')

    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/organization/update`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: orgId
      }
    })

    return response.data
  } catch (error) {
    console.error('Error updating organization details:', error)
    throw error
  }
}

export default updateOrganizationDetails
