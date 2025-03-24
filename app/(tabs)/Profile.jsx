import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { storeData, getData, removeData } from '../../services/storageService';
// import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const router = useRouter();

    const [profileImage, setProfileImage] = useState(null);
    const [userInfo, setUserInfo] = useState({
        nik: '',
        namaLengkap: '',
        noTelepon: '',
        email: '',
        nomorBPJS: ''
    });

    const pickImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //   allowsEditing: true,
        //   aspect: [1, 1],
        //   quality: 1,
        // });

        // if (!result.canceled) {
        //   setProfileImage(result.assets[0].uri);
        // }
    };

    const handleSave = () => {
        console.log('Saving user profile', userInfo);
        // Implement save functionality
    };

    const handleLogout = async () => {
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success Logout',
            textBody: 'Selamat tinggal, ' + userInfo.namaLengkap + '👋',
        })
        console.log('Logout success');
        await removeData('token');
        await removeData('user');
        await removeData('isLogin');
        router.push('/login');
    };

    const setUser = async () => {
        const user = await getData('user');
        setUserInfo({
            nik: user.nik,
            namaLengkap: user.name,
            noTelepon: user.no_hp,
            email: user.email,
            nomorBPJS: user.no_bpjs
        });
    }

    useEffect(() => {
        setUser();
    })

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
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Text style={styles.placeholderText}>105 × 105</Text>
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickImage}
                        >
                            <Ionicons name="image" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{userInfo.namaLengkap}</Text>
                        <Text style={styles.userEmail}>{userInfo.email}</Text>
                        <Text style={styles.userPhone}>{userInfo.noTelepon}</Text>

                        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
                            <Text style={styles.logoutText}>Logout</Text>
                            <Ionicons name="power" size={20} color="white" style={styles.logoutIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <Text style={styles.inputLabel}>NIK</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.nik}
                        onChangeText={(text) => setUserInfo({ ...userInfo, nik: text })}
                        keyboardType="numeric"
                    />

                    <Text style={styles.inputLabel}>Nama Lengkap</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.namaLengkap}
                        onChangeText={(text) => setUserInfo({ ...userInfo, namaLengkap: text })}
                    />

                    <Text style={styles.inputLabel}>No Telepon</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.noTelepon}
                        onChangeText={(text) => setUserInfo({ ...userInfo, noTelepon: text })}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.email}
                        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                        keyboardType="email-address"
                    />

                    <Text style={styles.inputLabel}>Nomor BPJS</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.nomorBPJS}
                        onChangeText={(text) => setUserInfo({ ...userInfo, nomorBPJS: text })}
                    />

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>Simpan</Text>
                    </TouchableOpacity>
                </View>
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
});