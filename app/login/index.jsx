import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100%',
        marginBottom: 20,
        bottom: 0,
    }
})

export default function LoginScreen() {

    const router = useRouter();

    return (
        <View>
            <Text>Login Screen 1</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/login/LogScreen2')}
            >
                <Text style={{ color: 'white' }}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}
