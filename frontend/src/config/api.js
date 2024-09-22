import axios from 'axios';

// API Client Config
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// for request errors globals
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API call error:', error);
        return Promise.reject(error);
    }
);

export default api;
