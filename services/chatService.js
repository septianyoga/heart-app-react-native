import axios from 'axios';
import { getData } from './storageService';

// Konfigurasi Axios
const API_URL = "https://api-backend.heart-apps.com/api";

// Create an async function to set up the API instance
const createApiInstance = async () => {
    const token = await getData('token');
    // Create axios instance with token
    const api = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
        },
    });

    return api;
};

// Usage example with sendMessage function
export const sendMessage = async (chatData) => {
    try {
        const api = await createApiInstance();
        const response = await api.post('/send-message', chatData);
        console.log('response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('error login: ', error.message);
        throw error.response?.data || 'Gagal Kirim Chat';
    }
};

export const fetchMessages = async (userId) => {
    try {
        const api = await createApiInstance();
        const response = await api.get('/fetch-message', {
            params: { receiver_id: 1 }, // Add the receiver_id you want to fetch for (1 for admin)
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching messages: ', error.message);
        throw error.response?.data || 'Gagal Ambil Chat';
    }
};

