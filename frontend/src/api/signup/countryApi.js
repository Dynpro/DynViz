import axios from '@/config/axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('/utils/countries');
    console.log('CountryResponse', response);
    return response.data.Data || [];
  } catch (error) {
    console.error('Error fetching countries:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const fetchCountryCode = async (country) => {
  try {
    const response = await axios.post('/utils/countrycode', { country });
    console.log('Country code response:', response);
    return response.data.Data || '';
  } catch (error) {
    console.error('Error fetching country code:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
