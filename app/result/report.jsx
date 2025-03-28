import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Report() {
    const router = useRouter();
    const params = useLocalSearchParams();

    console.log(params)
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: params.score < 12 ? '#54c42e' : '#ff0000' }]}>
            {/* Green Background Area with Curve */}
            <View style={styles.topContainer} />
            {/* Score Area */}
            <View style={styles.containerImage}>
                <View style={[styles.imageWrapper, { borderColor: params.score < 12 ? '#fff' : '#ff0000' }]}>
                    <Image source={require('../../assets/images/doctor.png')} style={styles.image} />
                </View>
            </View>
            <View style={[styles.scoreContainer, { backgroundColor: params.score < 12 ? '#54c42e' : '#ff0000' }]}>
                <Text style={styles.score}>{params.score}<Text style={{ fontSize: 35 }}>pt</Text>
                </Text>
                <Text style={styles.riskText}>{params.score < 12 ? 'Low Risk' : 'High Risk'}!</Text>
                <Text style={styles.description}>{params.score < 12 ? 'Resiko rendah. Tidak perlu dilakukan perawatan di Rumah Sakit.' : 'Resiko tinggi. Perlu dilakukan perawatan di Rumah Sakit.'}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.yaButton} onPress={() => router.push({ pathname: '/result', params: params })}>
                    <Text style={styles.yaButtonText}>Lihat Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tidakButton} onPress={() => router.push('/(tabs)/Test')}>
                    <Text style={styles.tidakButtonText}>Test Ulang</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
