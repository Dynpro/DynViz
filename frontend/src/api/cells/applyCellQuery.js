import axios from 'axios'

const applyCellQuery = async (cellID, datablockID, connectionId, query) => {
  let accessToken
  try {
    accessToken = localStorage.getItem('accessToken')
  } catch (error) {
    throw new Error(`Failed to get token: ${error.message}`)
  }
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/datablock/apply`,
      { DatablockID: datablockID, CellID: cellID, ConnectionID: connectionId, Query: query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error(`Failed to update cell: ${error.message}`)
  }
}

export default applyCellQuery
