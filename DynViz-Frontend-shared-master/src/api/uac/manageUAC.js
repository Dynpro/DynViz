// src/api/uac/manageUAC.js
import axios from 'axios'

const manageUAC = async (roleID, userIDs) => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  const payload = {
    RoleID: roleID,
    UserID: userIDs
  }

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/uac/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to assign roles')
  }
}

export default manageUAC
