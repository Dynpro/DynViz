import axios from 'axios'

const updateRole = async payload => {
  console.log('Update role payload--', payload.Name, payload.Permission)

  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/role/update?id=${payload.id}`,
      {
        Name: payload.Name,
        Permission: payload.Permission
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error updating role:', error)
    throw error
  }
}

export default updateRole
