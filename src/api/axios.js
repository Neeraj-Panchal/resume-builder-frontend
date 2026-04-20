// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    // Naya Render URL yahan daal diya hai
    // baseURL: 'https://resume-builder-api-ywfi.onrender.com',
    baseURL: 'http://localhost:8080',

    
});

// Request Interceptor (Pehle jaisa hi rahega)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // Agar token hai aur wo "null"/"undefined" string nahi hai
    if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Agar token nahi hai (Register/Login case), toh header delete kar do
        delete config.headers.Authorization;
    }
    return config;
}, (error) => Promise.reject(error));

export default api;