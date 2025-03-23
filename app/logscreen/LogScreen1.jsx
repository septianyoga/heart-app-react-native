import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/login')}>
                <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/loading-screen.png')} style={styles.image} />
            <Text style={styles.title}>Hart Health Check</Text>
            <Text style={styles.subtitle}>Monitor your heart health and get personalized tips.</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/logscreen/LogScreen2')}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#54c42e',
        padding: 15
    },
    skipButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5
    },
    skipButtonText: {
        color: 'white',
        fontSize: 14
    },
    image: {
        width: 350,
        height: 380,
        resizeMode: 'contain',
        paddingBottom: 0
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: 'white',
        textAlign: 'justify',
        textAlignVertical: 'center'
    },
    nextButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16
    }
})

