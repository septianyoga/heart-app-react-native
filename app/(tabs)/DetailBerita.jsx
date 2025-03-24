import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DetailBerita() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Health App</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.containerImage}>
                    <Image
                        source={require('../../assets/images/jantung-1.jpg')}
                        style={styles.image}
                    />
                </View>

                <View style={styles.containerContent}>
                    <Text style={styles.title}>
                        Jantung Kronis: Mengenal Gejala dan Pencegahan
                    </Text>
                    <Text style={styles.date}>
                        24 November 2025
                    </Text>
                    <Text style={styles.subTitle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 8,
    },
    scrollView: {
        flex: 1,
    },
    containerImage: {
        width: '100%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    containerContent: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        marginBottom: 10,
    },
});
