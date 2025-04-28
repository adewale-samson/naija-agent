import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    timeout: 50000,
  });
export const axiosFormDataInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*"
    },
    timeout: 50000,
  });
