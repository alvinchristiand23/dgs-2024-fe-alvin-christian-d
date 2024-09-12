// src/api/axios.js
import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error.code;
    switch (code) {
      case 'ERR_NETWORK':
        toast.error('Network error. Please check your network.');
        break;
      case 'ERR_SERVER':
        toast.error('Server error. Try again later.');
        break;
      default:
        toast.error(error.message || 'An unexpected error occurred.');
    }
    console.error('Response Error:', error);
    const errorResponse: Error = {
      name: error.name,
      message: error.message || 'An unexpected error occurred',
    };
    return Promise.reject(errorResponse);
  },
);

export default apiClient;
