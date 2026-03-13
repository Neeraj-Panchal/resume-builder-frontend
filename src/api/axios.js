// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    // Naya Render URL yahan daal diya hai
    baseURL: 'https://resume-builder-api-ywfi.onrender.com',

    
});

// Request Interceptor (Pehle jaisa hi rahega)
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