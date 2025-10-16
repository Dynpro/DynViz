import axios from 'axios'

const deleteFolder = async (accessToken, folderId) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/folder/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: folderId
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete folder')
  }
}

export default deleteFolder
