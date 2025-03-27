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

export const getAntrian = async (userData) => {
    try {
        const response = await api.get('/antrian', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Gagal mengambil antrian';
    }
};

export const ambilAntrian = async (data) => {
    try {
        const response = await api.post('/ambil-antrian', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Gagal mengambil antrian';
    }
};

export const getCurrentAntrian = async (user_id) => {
    try {
        const response = await api.get('/get-antrian-sekarang/' + user_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Gagal mengambil antrian sekarang';
    }
};

export const getHistoryAntrian = async (user_id) => {
    try {
        const response = await api.get('/get-history-antrian/' + user_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Gagal mengambil history antrian ';
    }
};