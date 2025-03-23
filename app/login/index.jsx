import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { login } from '../../services/authService';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await login({ email, password });
            if (response.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success Login',
                    textBody: 'Selamat datang, ' + response.data.user.name + '👋',
                })
                return router.push('/(tabs)')
            }
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Gagal',
                textBody: response.message,
                button: 'close',
            })
        } catch (error) {
            console.log('error login: ', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.linkText}>Daftar disini</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    linkContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    linkText: {
        fontSize: 16
    }
})
