import axios from 'axios'

const createFolder = async (accessToken, projectId, folderName) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/folder/create`
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
  const data = {
    Name: folderName,
    ProjectID: parseInt(projectId)
  }

  try {
    const response = await axios.post(url, data, { headers })
    return response.data
  } catch (error) {
    throw error
  }
}

export default createFolder
