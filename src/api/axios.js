// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    // .env se URL aayega (default fallback bhi de diya hai)
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// Request Interceptor: LocalStorage se token nikal kar header me daalne ke liye
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;