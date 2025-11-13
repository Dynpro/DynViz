import axios from 'axios'

const getRoles = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('No access token found')
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/role/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data && response.data.Data) {
      // console.log('this is backend data of roles---', response.data.Data)
      // console.log('this is backend data for response.data---', response.data)
      // Filter active users
      //   const activeUsers = response.data.Data.filter(user => user.Status === 'Active');
      return response.data.Data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export default getRoles
