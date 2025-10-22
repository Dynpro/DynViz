import axios from 'axios'

const createRole = async (roleName, permissions) => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/role/create`,
      {
        Name: roleName,
        Permission: permissions
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error creating role:', error)
    throw error
  }
}

export default createRole
