import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

export default function LogScreen2() {
    const router = useRouter();

    return (
        <View>
            <Text>Login Screen 2</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/login/Login')}
            >
                <Text style={{ color: 'white' }}>Next</Text>
            </TouchableOpacity>
            <Button title='Back' onPress={() => router.back()}>Back</Button>
        </View>
    )
}

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