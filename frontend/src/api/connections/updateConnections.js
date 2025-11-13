import axios from 'axios'

const updateConnection = async (accessToken, id, connectionData) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/connection/update?id=${id}`,
      {
        Name: connectionData.name,
        params: {
          host: connectionData.host,
          port: connectionData.port,
          database_name: connectionData.database_name,
          username: connectionData.username,
          password: connectionData.password
        },
        ConnectionMasterID: connectionData.ConnectionMasterID,
        dbtype: connectionData.DBType
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error('Failed to update connection: ' + error.message)
  }
}

export default updateConnection
