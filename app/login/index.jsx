import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { login } from '../../services/authService';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { Checkbox } from 'react-native-paper';
import { storeData, getData, removeData } from '../../services/storageService';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('window');
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await login({ email, password });
            if (response.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success Login',
                    textBody: 'Selamat datang, ' + response.data.user.name + '👋',
                })
                await storeData('token', response.data.token);
                await storeData('user', response.data.user);
                await storeData('isLogin', true);
                return router.push('/(tabs)')
            }
            setLoading(false);
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Gagal',
                textBody: response.message,
                button: 'close',
            })
        } catch (error) {
            setLoading(false);
            console.log('error login: ', error.message);
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            const isLogin = await getData('isLogin');
            if (isLogin) {
                return router.push('/(tabs)')
            }
        }
        checkLogin();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images//logo/1.png')} style={styles.image} />
            </View>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.title}>Selamat Datang</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={showPassword ? 'checked' : 'unchecked'}  // Set checkbox status based on showPassword state
                    onPress={() => setShowPassword(!showPassword)}
                    color="#54c42e"
                />
                <Text>Lihat Password</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Text style={styles.textLink}>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.linkText}>Daftar Yuk</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerLogo}>
                <Image source={require('../../assets/images/logo/tutwuri.png')} style={styles.logo} />
                <Image source={require('../../assets/images/logo/kedaireka.png')} style={styles.logo} />
                <Image source={require('../../assets/images/logo/vokasi.png')} style={styles.logo} />
                <Image source={require('../../assets/images/logo/1.png')} style={styles.logo} />
                <Image source={require('../../assets/images/logo/polsub.png')} style={styles.logo} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: 20
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        fontWeight: 600,
        marginTop: -50,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: '#54c42e',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    linkContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    linkText: {
        fontSize: 16,
        color: '#007AFF'
    },
    textLink: {
        fontSize: 16,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    image: {
        width: 320,
        height: 380,
        resizeMode: 'contain',
        paddingBottom: 0,
        marginTop: -50
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -5,
        marginLeft: -5
    },
    containerLogo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: height * 0.1,
        marginBottom: 20
    },
    logo: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginBottom: 20
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
})
