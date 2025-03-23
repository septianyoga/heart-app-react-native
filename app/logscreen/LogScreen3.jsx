import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { storeData, getData, removeData } from '../../services/storageService';

export default function LogScreen2() {
    const router = useRouter();

    const finishOnboarding = async () => {
        await storeData("hasSeenOnboarding", "true");
        router.replace("/(tabs)"); // Arahkan ke halaman utama (tabs)
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../../assets/images/ilustrasi-3.png')}
                        style={styles.mainImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Track Your Heartbeat</Text>
                    <Text style={styles.subheading}>
                        Easily monitor your heart rate and keep a record of your daily measurements.
                    </Text>
                </View>

                <View style={styles.navigationButtons}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.push('/logscreen/LogScreen2')}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => finishOnboarding()}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                        <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#54c42e',
    },
    safeArea: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
    },
    skipContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    skipButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    cameraButton: {
        marginLeft: 15,
        backgroundColor: 'white',
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    illustration: {
        width: '85%',
        height: 300,
        backgroundColor: 'rgba(220, 240, 255, 0.9)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    icon: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    clipboardIcon: {
        top: '10%',
        left: '15%',
    },
    pillsIcon: {
        top: '20%',
        right: '10%',
    },
    syringeIcon: {
        top: '45%',
        right: '15%',
    },
    heartIcon: {
        top: '30%',
        right: '5%',
    },
    crossIcon: {
        bottom: '20%',
        right: '10%',
    },
    textContainer: {
        paddingHorizontal: 30,
        marginBottom: 50,
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
    },
    subheading: {
        fontSize: 18,
        color: 'white',
        lineHeight: 26,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#006FCD',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    nextButton: {
        backgroundColor: '#006FCD',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginHorizontal: 5,
    },
});