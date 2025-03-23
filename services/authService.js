import axios from 'axios';
import env from '../config/env';

// Konfigurasi Axios
const API_URL = env.API_URL;

// Buat instance Axios dengan konfigurasi default
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Fungsi untuk mengambil semua user
// export const getUsers = async () => {
//     try {
//         const response = await api.get('/users');
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || 'Error fetching users';
//     }
// };

// Fungsi untuk menambahkan user baru
export const login = async (userData) => {
    try {
        const response = await api.post('/signin', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Login Gagal';
    }
};

// Fungsi untuk mengupdate user
// export const updateUser = async (id, userData) => {
//     try {
//         const response = await api.put(`/users/${id}`, userData);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || 'Error updating user';
//     }
// };

// Fungsi untuk menghapus user
// export const deleteUser = async (id) => {
//     try {
//         const response = await api.delete(`/users/${id}`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || 'Error deleting user';
//     }
// };
