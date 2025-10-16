import axios from 'axios'

const updateFolder = async (accessToken, folderId, folderName) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/folder/update?id=${folderId}`,
      { Name: folderName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error(`Failed to update folder: ${error.message}`)
  }
}

export default updateFolder
