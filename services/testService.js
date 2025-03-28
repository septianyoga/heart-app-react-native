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

export const sendTest = async (data) => {
    try {
        const response = await api.post('/result-test', data);
        return response.data;
    } catch (error) {
        return error
        throw error.response?.data || 'Gagal Test';
    }
};

export const getTestHistory = async (user_id) => {
    try {
        const response = await api.get('/history-test/' + user_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Gagal Get Test History';
    }
};