import axios from 'axios'

const deleteUser = async id => {
  try {
    console.log('this is deleted user for roles---', id)
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('No access token found')
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/delete`,
      { IDs: [id] },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export default deleteUser
