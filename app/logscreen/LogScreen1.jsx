import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LogScreen1() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.skipContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => router.push('/login')}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../../assets/images/loading-screen.png')}
                        style={styles.mainImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Heart Health Check</Text>
                    <Text style={styles.subheading}>
                        Monitor your heart health and get personalized tips.
                    </Text>
                </View>

                <View style={styles.navigationButtons}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => router.push('/logscreen/LogScreen2')}
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
        justifyContent: 'center',
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