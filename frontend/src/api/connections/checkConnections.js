// src/api/connections/checkConnections.js
import axios from 'axios'

export const checkConnection = async formData => {
  const accessToken = localStorage.getItem('accessToken')
  var payload

  console.log(formData)
  if (parseInt(formData['Connection Master ID']) == 10001) {
    payload = {
      name: formData['Name'] || formData['name'],
      params: {
        host: formData['Host'],
        port: parseInt(formData['Port']),
        database_name: formData['Database Name'],
        username: formData['Username'],
        password: formData['Password']
      },
      ConnectionMasterID: parseInt(formData['Connection Master ID']),
      dbtype: formData['DB Type'],
      status: parseInt(formData['Status'])
    }
  }
  if (parseInt(formData['Connection Master ID']) == 10002) {
    payload = {
      name: formData['Name'] || formData['name'],
      params: {
        account: formData['Account'],
        username: formData['Username'],
        password: formData['Password'],
        database: formData['Database'],
        warehouse: formData['Warehouse']
      },
      ConnectionMasterID: parseInt(formData['Connection Master ID']),
      dbtype: formData['DB Type'],
      status: parseInt(formData['Status'])
    }
  }

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/connection/check`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return { success: true, message: response.data.message }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message }
  }
}
