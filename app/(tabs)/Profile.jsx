import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { storeData, getData, removeData } from '../../services/storageService';
import * as ImagePicker from 'expo-image-picker';
import { updatePassword, updateProfile } from '../../services/profileService';

export default function ProfileScreen() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [isProfile, setIsProfile] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: '',
        nik: '',
        name: '',
        no_hp: '',
        email: '',
        no_bpjs: '',
        foto: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const pickImage = async () => {
        if (isLoading) return;
    
        try {
            setIsLoading(true);
            setImageLoading(true);
    
            // Meminta izin akses galeri
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Izin diperlukan',
                    textBody: 'Aplikasi membutuhkan izin untuk mengakses galeri foto Anda.',
                    button: 'close',
                });
                return;
            }
    
            // Membuka image picker dengan API baru
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaType.Images, // <-- Perubahan di sini
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                selectionLimit: 1, // Hanya memilih 1 gambar
            });
    
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                const imageUri = `${selectedImage.uri}?${Date.now()}`;
                setProfileImage(imageUri);
                console.log('Image selected:', imageUri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Gagal memilih gambar: ' + error.message,
                button: 'close',
            });
        } finally {
            setIsLoading(false);
            setImageLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const response = await updateProfile(userInfo.id, userInfo, profileImage);
            console.log(response);
            
            if (response.status) {
                await removeData('user');
                await storeData('user', response.data);
                await setUser();
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Berhasil',
                    textBody: 'Profil berhasil diperbarui',
                    button: 'close',
                });
            } else {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Gagal',
                    textBody: response.message || 'Gagal memperbarui profil',
                    button: 'close',
                });
            }
        } catch (error) {
            console.error('Update profile error:', error);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui profil',
                button: 'close',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async () => {
        try {
            setIsLoading(true);
            const response = await updatePassword(userInfo.id, {
                current_password: userInfo.oldPassword,
                password: userInfo.newPassword,
                password_confirmation: userInfo.confirmPassword
            });
            
            if (response.status) {
                setUserInfo({
                    ...userInfo,
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Berhasil',
                    textBody: 'Password berhasil diubah',
                    button: 'close',
                });
            } else {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Gagal',
                    textBody: response.message || 'Gagal mengubah password',
                    button: 'close',
                });
            }
        } catch (error) {
            console.error('Change password error:', error);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error.response?.data?.message || 'Terjadi kesalahan saat mengubah password',
                button: 'close',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await removeData('token');
            await removeData('user');
            await removeData('isLogin');
            
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Berhasil Logout',
                textBody: 'Sampai jumpa lagi, ' + (userInfo.name || 'Pengguna') + ' 👋',
            });
            
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const setUser = async () => {
        try {
            const user = await getData('user');
            if (user) {
                setCurrentUser(user);
                setUserInfo({
                    id: user.id || '',
                    nik: user.nik || '',
                    name: user.name || '',
                    no_hp: user.no_hp || '',
                    email: user.email || '',
                    no_bpjs: user.no_bpjs || '',
                    foto: user.foto || '',
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                
                // Jika ada foto profil, tambahkan timestamp untuk memastikan gambar fresh
                if (user.foto) {
                    setProfileImage(`${user.foto}?${Date.now()}`);
                }
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    useEffect(() => {
        setUser();
    }, []);

    return (
        <AlertNotificationRoot>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Heart App</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.profileImageContainer}>
                            {imageLoading ? (
                                <View style={[styles.profileImage, styles.loadingContainer]}>
                                    <ActivityIndicator size="large" color="#54c42e" />
                                </View>
                            ) : profileImage ? (
                                <Image 
                                    source={{ uri: profileImage }} 
                                    style={styles.profileImage}
                                    onLoadStart={() => setImageLoading(true)}
                                    onLoadEnd={() => setImageLoading(false)}
                                    onError={(e) => {
                                        console.log('Image load error:', e.nativeEvent.error);
                                        setImageLoading(false);
                                    }}
                                />
                            ) : currentUser?.foto ? (
                                <Image 
                                    source={{ uri: currentUser.foto }} 
                                    style={styles.profileImage}
                                    onLoadStart={() => setImageLoading(true)}
                                    onLoadEnd={() => setImageLoading(false)}
                                    onError={(e) => {
                                        console.log('Image load error:', e.nativeEvent.error);
                                        setImageLoading(false);
                                    }}
                                />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Ionicons name="person" size={50} color="#666" />
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={pickImage}
                                disabled={isLoading}
                            >
                                <Ionicons name="camera" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.userInfo}>
                            <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                                {currentUser?.name || 'Nama Pengguna'}
                            </Text>
                            <Text style={styles.userEmail} numberOfLines={1} ellipsizeMode="tail">
                                {currentUser?.email || 'email@example.com'}
                            </Text>
                            <Text style={styles.userPhone} numberOfLines={1} ellipsizeMode="tail">
                                {currentUser?.no_hp || '08123456789'}
                            </Text>

                            <TouchableOpacity 
                                style={styles.logoutButton} 
                                onPress={handleLogout}
                                disabled={isLoading}
                            >
                                <Text style={styles.logoutText}>Logout</Text>
                                <Ionicons name="exit-outline" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Navigation Tabs */}
                    <View style={styles.navContainer}>
                        <TouchableOpacity
                            style={[
                                styles.navButton,
                                isProfile && styles.activeNavButton
                            ]}
                            onPress={() => setIsProfile(true)}
                            disabled={isLoading}
                        >
                            <Text style={styles.navTitle}>Profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.navButton,
                                !isProfile && styles.activeNavButton
                            ]}
                            onPress={() => setIsProfile(false)}
                            disabled={isLoading}
                        >
                            <Text style={styles.navTitle}>Ganti Password</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Form Section */}
                    {isProfile ? (
                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>NIK</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.nik}
                                onChangeText={(text) => setUserInfo({...userInfo, nik: text})}
                                placeholder="Masukkan NIK"
                                editable={!isLoading}
                            />

                            <Text style={styles.inputLabel}>Nama Lengkap</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.name}
                                onChangeText={(text) => setUserInfo({...userInfo, name: text})}
                                placeholder="Masukkan nama lengkap"
                                editable={!isLoading}
                            />

                            <Text style={styles.inputLabel}>No Telepon</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.no_hp}
                                onChangeText={(text) => setUserInfo({...userInfo, no_hp: text})}
                                placeholder="Masukkan nomor telepon"
                                keyboardType="phone-pad"
                                editable={!isLoading}
                            />

                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.email}
                                onChangeText={(text) => setUserInfo({...userInfo, email: text})}
                                placeholder="Masukkan email"
                                keyboardType="email-address"
                                editable={!isLoading}
                            />

                            <Text style={styles.inputLabel}>Nomor BPJS</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.no_bpjs}
                                onChangeText={(text) => setUserInfo({...userInfo, no_bpjs: text})}
                                placeholder="Masukkan nomor BPJS"
                                editable={!isLoading}
                            />

                            <TouchableOpacity
                                style={[styles.saveButton, isLoading && styles.disabledButton]}
                                onPress={handleSave}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>Password Lama</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.oldPassword}
                                onChangeText={(text) => setUserInfo({...userInfo, oldPassword: text})}
                                placeholder="Masukkan password lama"
                                secureTextEntry={true}
                                editable={!isLoading}
                            />

                            <Text style={styles.inputLabel}>Password Baru</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.newPassword}
                                onChangeText={(text) => setUserInfo({...userInfo, newPassword: text})}
                                placeholder="Masukkan password baru"
                                secureTextEntry={true}
                                editable={!isLoading}
                            />

                            <Text style={styles.inputLabel}>Konfirmasi Password</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.confirmPassword}
                                onChangeText={(text) => setUserInfo({...userInfo, confirmPassword: text})}
                                placeholder="Konfirmasi password baru"
                                secureTextEntry={true}
                                editable={!isLoading}
                            />

                            <TouchableOpacity
                                style={[styles.saveButton, isLoading && styles.disabledButton]}
                                onPress={handleChangePassword}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Text style={styles.saveButtonText}>Ganti Password</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileSection: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileImageContainer: {
        position: 'relative',
        marginRight: 20,
    },
    profileImage: {
        width: 105,
        height: 105,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderImage: {
        width: 105,
        height: 105,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButton: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        backgroundColor: '#54c42e',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    userPhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    logoutButton: {
        backgroundColor: '#54c42e',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 5,
    },
    navContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    navButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeNavButton: {
        backgroundColor: '#e8f5e9',
        borderBottomWidth: 2,
        borderBottomColor: '#54c42e',
    },
    navTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    formContainer: {
        padding: 20,
        backgroundColor: 'white',
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#54c42e',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    disabledButton: {
        opacity: 0.6,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});