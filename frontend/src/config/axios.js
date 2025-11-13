import axios from 'axios';

// Log the base URL for debugging
console.log('Axios Base URL:', process.env.NEXT_PUBLIC_BASE_URL);

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: false, // Changed to false to work with CORS wildcard
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
