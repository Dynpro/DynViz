import axios from 'axios'

const getCellsByTile = async TileID => {
  let accessToken
  try {
    accessToken = localStorage.getItem('accessToken')
  } catch (error) {
    throw new Error(`Failed to get token: ${error.message}`)
  }
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Cell/Getcell?id=${TileID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to update cell: ${error.message}`)
  }
}

export default getCellsByTile
