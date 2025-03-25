import axios from 'axios';

// Konfigurasi Axios
const API_URL = "https://api-backend.heart-apps.com/api";

// Buat instance Axios dengan konfigurasi default
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const getBerita = async (userData) => {
    try {
        const response = await api.get('/berita', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Login Gagal';
    }
};