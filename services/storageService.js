import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Menyimpan data ke AsyncStorage
 * @param {string} key - Kunci penyimpanan
 * @param {any} value - Nilai yang akan disimpan
 */
export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error('Gagal menyimpan data ke AsyncStorage:', error);
    }
};

/**
 * Mengambil data dari AsyncStorage
 * @param {string} key - Kunci penyimpanan
 * @returns {Promise<any | null>} - Nilai yang tersimpan atau null jika tidak ditemukan
 */
export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Gagal mengambil data dari AsyncStorage:', error);
        return null;
    }
};

/**
 * Menghapus data dari AsyncStorage
 * @param {string} key - Kunci penyimpanan
 */
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Gagal menghapus data dari AsyncStorage:', error);
    }
};
