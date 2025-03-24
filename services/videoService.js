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

// Fungsi untuk mengambil semua user
export const getVideo = async () => {
    try {
        const response = await api.get('/video-tutorial');
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error fetching users';
    }
};
