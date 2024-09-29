import axios from 'axios';
import keyCloakService from '../auth/keycloakService';

// API Client Config
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// add token
api.interceptors.request.use(
    async (config) => {
        const token = keyCloakService.GetAccessToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// for request errors globals
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API call error:', error);
        return Promise.reject(error);
    }
);

export default api;
