import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';

export default function Register() {
    const [nik, setNik] = useState('')
    const [namaLengkap, setNamaLengkap] = useState('')
    const [noTelepon, setNoTelepon] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('')
    const [bpjs, setBpjs] = useState('Tidak')
    const router = useRouter();

    const handleRegister = () => {
        console.log('Register dengan data: ', { nik, namaLengkap, noTelepon, email, password, konfirmasiPassword, bpjs })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="NIK"
                value={nik}
                onChangeText={setNik}
            />
            <TextInput
                style={styles.input}
                placeholder="Nama Lengkap"
                value={namaLengkap}
                onChangeText={setNamaLengkap}
            />
            <TextInput
                style={styles.input}
                placeholder="No Telepon"
                value={noTelepon}
                onChangeText={setNoTelepon}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Konfirmasi Password"
                secureTextEntry
                value={konfirmasiPassword}
                onChangeText={setKonfirmasiPassword}
            />
            <View style={styles.bpjsContainer}>
                <Text style={styles.bpjsText}>Apakah ada BPJS?</Text>
                <RadioButton
                    value="Ya"
                    status={bpjs === 'Ya' ? 'checked' : 'unchecked'}
                    onPress={() => setBpjs('Ya')}
                />
                <RadioButton
                    value="Tidak"
                    status={bpjs === 'Tidak' ? 'checked' : 'unchecked'}
                    onPress={() => setBpjs('Tidak')}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Sudah punya akun? </Text>
                <TouchableOpacity onPress={() => router.push('/login/Login')}>
                    <Text style={styles.linkText}>Login disini</Text>
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
    },
    bpjsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    bpjsText: {
        fontSize: 16
    }
})

