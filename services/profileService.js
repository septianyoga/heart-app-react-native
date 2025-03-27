import axios from 'axios';
// import * as FileSystem from 'expo-file-system';

// Konfigurasi Axios
const API_URL = "https://api-backend.heart-apps.com/api";

// Buat instance Axios dengan konfigurasi default
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
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

export const updateProfile = async (id, userData, profileImage) => {
    try {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('nik', userData.nik);
        formData.append('no_hp', userData.no_hp);
        formData.append('email', userData.email);
        formData.append('no_bpjs', userData.no_bpjs);

        if (profileImage) {
            const response = await fetch(profileImage);
            const blob = await response.blob();
            formData.append('foto', {
                uri: profileImage,   // <- Pakai uri dari Expo Image Picker
                name: `profile_${Date.now()}.jpg`,  // <- Nama file
                type: blob.type,  // <- MIME type (image/jpeg)
            });
        }
        // return profileImage
        const response = await api.post(`/update-profile/${id}`, formData);

        return response.data;
    } catch (error) {
        return error
        throw error.response?.data || 'Update Gagal';
    }
};

export const updatePassword = async (id, userData) => {
    try {
        const response = await api.post(`/update-password/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Update Gagal';
    }
}