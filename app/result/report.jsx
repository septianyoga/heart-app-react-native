import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Report() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Green Background Area with Curve */}
            <View style={styles.topContainer} />
            {/* Score Area */}
            <View style={styles.containerImage}>
                <View style={styles.imageWrapper}>
                    <Image source={require('../../assets/images/doctor.png')} style={styles.image} />
                </View>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>7<Text style={{ fontSize: 35 }}>pt</Text>
                </Text>
                <Text style={styles.riskText}>Low Risk!</Text>
                <Text style={styles.description}>Resiko rendah. Tidak perlu dilakukan perawatan di Rumah Sakit.</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.yaButton} onPress={() => router.push('/result')}>
                    <Text style={styles.yaButtonText}>Lihat Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tidakButton } onPress={() => router.push('/(tabs)/test')}>
                    <Text style={styles.tidakButtonText}>Test Ulang</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#54c42e',
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 250,
        borderBottomRightRadius: 250,
        padding: 20,
        overflow: 'hidden',
        zIndex: 1,
        marginBottom: -30,
    },
    scoreContainer: {
        flex: 1,
        zIndex: 0,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#54c42e',
    },
    containerImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
        marginBottom: 20,
        zIndex: 3
    },
    imageWrapper: {
        padding: 10,
        borderRadius: 150,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#54c42e',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    score: {
        fontSize: 90,
        fontWeight: 800,
        color: '#fff',
    },
    riskText: {
        fontSize: 22,
        fontWeight: 600,
        color: '#fff',
        marginVertical: 5,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    yaButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    yaButtonText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tidakButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },
    tidakButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
