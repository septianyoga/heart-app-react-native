import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { storeData, getData, removeData } from '../../services/storageService';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../../services/profileService';
import { set } from 'date-fns';

export default function ProfileScreen() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState({});
    const [isProfile, setIsProfile] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
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

    // const pickImage = async () => {
    //     // Cek dan minta izin akses galeri
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //         Alert.alert('Izin diperlukan', 'Berikan izin untuk mengakses galeri.');
    //         return;
    //     }

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         const selectedImage = result.assets[0]; // Ambil objek gambar

    //         setProfileImage(selectedImage.uri);
    //     }
    // };

    const pickImage = async () => {
        // Cek dan minta izin akses galeri
        const { status } = await ImagePicker.launchImageLibraryAsync();
        if (status !== 'granted') {
            Alert.alert('Izin diperlukan', 'Berikan izin untuk mengakses galeri.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log("Image Picker Result:", result); // Cek apakah ada hasil

        if (!result.canceled) {
            const selectedImage = result.assets[0]; // Ambil objek gambar
            console.log("Selected Image URI:", selectedImage.uri); // Cek URI gambar

            setProfileImage(selectedImage.uri); // Set image URI ke state
        }
    };


    const handleSave = async () => {
        try {
            const response = await updateProfile(userInfo.id, userInfo, profileImage);
            console.log('response : ', response);
            if (response.status) {
                await removeData('user');
                await storeData('user', response.data);
                await setUser();
                return Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Update Berhasil',
                    button: 'close',
                })
            }
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Gagal Update',
                textBody: response.message,
                button: 'close',
            })
        } catch (error) {
            console.log('error gan: ', error);
            if (error.response) {
                return Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Gagal Update',
                    textBody: error.response.data.message,
                    button: 'close',
                })
            }
        }
    };

    const handleLogout = async () => {
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success Logout',
            textBody: 'Selamat tinggal, ' + userInfo.name + '👋',
        })
        console.log('Logout success');
        await removeData('token');
        await removeData('user');
        await removeData('isLogin');
        router.push('/login');
    };

    const setUser = async () => {
        const user = await getData('user');
        setCurrentUser(user);
        if (user) {
            setUserInfo({
                id: user.id || '',
                nik: user.nik || '',
                name: user.name || '',
                no_hp: user.no_hp || '',
                email: user.email || '',
                no_bpjs: user.no_bpjs || '',
                foto: user.foto || ''
            });
        }

    };
    useEffect(() => {
        setUser();
    }, [profileImage]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        {!currentUser?.foto && !profileImage && (
                            <View style={styles.placeholderImage}>
                                <Text style={styles.placeholderText}>105 × 105</Text>
                            </View>
                        )}
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Image source={{ uri: currentUser.foto }} style={styles.profileImage} />
                        )}
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickImage}
                        >
                            <Ionicons name="image" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{currentUser.name}</Text>
                        <Text style={styles.userEmail}>{currentUser.email}</Text>
                        <Text style={styles.userPhone}>{currentUser.no_hp}</Text>

                        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
                            <Text style={styles.logoutText}>Logout</Text>
                            <Ionicons name="power" size={20} color="white" style={styles.logoutIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.navContainer}>
                    <TouchableOpacity
                        style={[
                            styles.navButton,
                            isProfile && {
                                borderRightWidth: 1,
                                borderRightColor: '#ccc',
                                backgroundColor: '#54c42e',
                                opacity: 0.5
                            }
                        ]}
                        onPress={() => setIsProfile(true)}
                    >
                        <Text style={[styles.navTitle, { color: '#000' }]}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.navButton,
                            !isProfile && {
                                borderRightWidth: 1,
                                borderRightColor: '#ccc',
                                backgroundColor: '#54c42e',
                                opacity: 0.5
                            }
                        ]}
                        onPress={() => setIsProfile(false)}
                    >
                        <Text style={[styles.navTitle, { color: '#000' }]}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
                {/* Form Fields */}
                {(isProfile &&
                    <>
                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>NIK</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.nik}
                                onChangeText={(text) => setUserInfo(prevState => ({ ...prevState, nik: text }))}
                                keyboardType="numeric"
                            />

                            <Text style={styles.inputLabel}>Nama Lengkap</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.name}
                                onChangeText={(text) => setUserInfo(prevState => ({ ...prevState, name: text }))}
                            />

                            <Text style={styles.inputLabel}>No Telepon</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.no_hp}
                                onChangeText={(text) => setUserInfo(prevState => ({ ...prevState, no_hp: text }))}
                                keyboardType="phone-pad"
                            />

                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.email}
                                onChangeText={(text) => setUserInfo(prevState => ({ ...prevState, email: text }))}
                                keyboardType="email-address"
                            />

                            <Text style={styles.inputLabel}>Nomor BPJS</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.no_bpjs}
                                onChangeText={(text) => setUserInfo(prevState => ({ ...prevState, no_bpjs: text }))}
                            />

                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {(!isProfile &&
                    <>
                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>Password Lama</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.oldPassword}
                                onChangeText={(text) => setUserInfo({ ...userInfo, oldPassword: text })}
                                secureTextEntry={true}
                            />

                            <Text style={styles.inputLabel}>Password Baru</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.newPassword}
                                onChangeText={(text) => setUserInfo({ ...userInfo, newPassword: text })}
                                secureTextEntry={true}
                            />

                            <Text style={styles.inputLabel}>Konfirmasi Password</Text>
                            <TextInput
                                style={styles.input}
                                value={userInfo.confirmPassword}
                                onChangeText={(text) => setUserInfo({ ...userInfo, confirmPassword: text })}
                                secureTextEntry={true}
                            />

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 5,
        // paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 8,
    },
    scrollView: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
    },
    profileImageContainer: {
        position: 'relative',
        marginRight: 20,
    },
    profileImage: {
        width: 105,
        height: 105,
        borderRadius: 5,
    },
    placeholderImage: {
        width: 105,
        height: 105,
        borderRadius: 5,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#333',
    },
    uploadButton: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        top: 80,
        backgroundColor: '#54c42e',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#21295c',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 2,
    },
    userPhone: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    logoutButton: {
        backgroundColor: '#54c42e',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 5,
    },
    logoutIcon: {
        marginLeft: 5,
    },
    formContainer: {
        padding: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: '#54c42e',
        borderRadius: 5,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 5,
    },
    navButton: {
        width: '50%',
        backgroundColor: '#fff',
        // borderRadius: 5,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopColor: '#ccc',
        // paddingHorizontal: 5,
        alignItems: 'center',
    },
    navTitle: {
        color: '#54c42e',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});