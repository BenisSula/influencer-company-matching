import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { getToken } from './tokenStore';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor to attach token
api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
