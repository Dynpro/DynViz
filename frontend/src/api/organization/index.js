// src/api/organization.js

import axios from 'axios'

export const fetchOrganizations = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/all_organizations`)
    return response.data.Data // Extracting the relevant data
  } catch (error) {
    console.error('Error fetching organizations:', error)
    throw error
  }
}
