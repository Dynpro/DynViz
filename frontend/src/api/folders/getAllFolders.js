const getAllFolders = async projectId => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/folder/getall?id=${encodeURIComponent(projectId)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch folders')
  }

  const data = await response.json()
  return data.Data // Assuming 'Data' contains the folders array
}

export default getAllFolders
