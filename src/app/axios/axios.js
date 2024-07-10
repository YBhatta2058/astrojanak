import axios from 'axios';

//axios instance
const axiosInstance = axios.create({
    baseURL: 'https://your-api-base-url.com', // Replace with your base URL
    timeout: 10000, // Optional, timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
            }
        } else if (error.request) {
        } else {
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
