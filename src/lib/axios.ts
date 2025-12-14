import axios from 'axios';
import { getToken } from './auth';


export const api = axios.create({
    baseURL: '/api',
});


api.interceptors.request.use((config) => {
    const token = getToken();


    if (token && !config.url?.includes('/auth')) {
        config.headers.Authorization = `Bearer ${token}`;
    }


    return config;
});