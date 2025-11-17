import axios from 'axios'

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/utils/countries`)
    console.log('CountryResponse', response)
    return response.data.Data // Assuming the API response has a Data field with the list of countries
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw error
  }
}

export const fetchCountryCode = async country => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/utils/countrycode`, { country })
    console.log('Country code--', response)
    return response.data.Data
  } catch (error) {
    console.error('Error fetching country code:', error)
    throw error
  }
}
