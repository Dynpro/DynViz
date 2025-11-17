import axios from 'axios'

const getAllMenus = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    console.log("This is the menu token ----",accessToken)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/getall`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data.Data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export default getAllMenus
