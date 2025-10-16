import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || 'https://swiftship-backend-c5iz.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Add custom error code for network errors
    if (!error.response) {
      const networkError = new Error('Network error - please check your internet connection');
      (networkError as any).code = 'NETWORK_ERROR';
      return Promise.reject(networkError);
    }

    if (error.response.status === 401) {
      // Token expired or invalid, clear storage and redirect to home
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;
