import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState, useMemo } from 'react'
import { useRouter } from 'expo-router';
import RadioGroup from 'react-native-radio-buttons-group';
import { register } from '../../services/authService';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const { width, height } = Dimensions.get('window');

export default function Register() {
    const [nik, setNik] = useState('')
    const [name, setName] = useState('')
    const [no_hp, setNoTelepon] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setKonfirmasiPassword] = useState('')
    const [bpjs, setBpjs] = useState('')
    const [selectedId, setSelectedId] = useState('');
    const router = useRouter();

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Ya',
            value: 'Ya'
        },
        {
            id: '2',
            label: 'Tidak',
            value: 'Tidak'
        }
    ]), []);

    const handleRegister = async () => {
        try {
            const response = await register({ nik, name, no_hp, email, password, password_confirmation, bpjs });
            if (response.status) {
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Register Berhasil',
                    button: 'close',
                })
                return router.push('/login')
            }
            return Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Gagal Register',
                textBody: response.message,
                button: 'close',
            })
        } catch (error) {
            console.log('error login: ', error.message);
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images//logo/1.png')} style={styles.image} />
            </View>
            <Text style={styles.title}>Daftar Akun</Text>
            <TextInput
                style={styles.input}
                placeholder="NIK"
                value={nik}
                onChangeText={setNik}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nama Lengkap"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="No Telepon"
                value={no_hp}
                onChangeText={setNoTelepon}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
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
                value={password_confirmation}
                onChangeText={setKonfirmasiPassword}
            />
            <View style={styles.bpjsContainer}>
                <Text style={styles.bpjsText}>Apakah ada BPJS?</Text>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout='row'
                />
            </View>
            {selectedId === '1' && <TextInput
                style={styles.input}
                placeholder="No BPJS"
                value={bpjs}
                onChangeText={setBpjs}
            />}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Text style={styles.textLink}>Sudah punya akun? </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.linkText}>Login disini</Text>
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
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: width * 0.05,
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: -50
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 2,
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
        fontWeight: 'bold',
        textAlign: 'center'
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
    bpjsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    bpjsText: {
        fontSize: 16
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    image: {
        width: 120,
        height: 180,
        resizeMode: 'contain',
        paddingBottom: 0,
        marginTop: -50
    },
    containerLogo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: height * 0.04,
        marginBottom: 20
    },
    logo: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
        marginBottom: 20
    }
})

