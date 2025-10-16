import axios from 'axios'

const deleteConnection = async (accessToken, id) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/connection/delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    throw new Error('Failed to delete connection')
  }
}

export default deleteConnection
