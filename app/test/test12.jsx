import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Test12() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 12;

    const progressWidth = (currentPage / totalPages) * 100;
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>

            <View style={styles.barContainer}>
                <Text style={styles.barTitle}>Kuisioner</Text>
                <View style={styles.bar}>
                    <TouchableOpacity onPress={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}>
                        <Ionicons name="arrow-back" size={24} color="#54c42e" />
                    </TouchableOpacity>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.completedBar, { width: `${progressWidth}%` }]} />
                        <View style={[styles.remainingBar, { width: `${100 - progressWidth}%` }]} />
                    </View>
                    <TouchableOpacity onPress={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}>
                        <Ionicons name="arrow-forward" size={24} color="#54c42e" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.contentTitle}>Mudah Lelah</Text>

                <View>
                    <TouchableOpacity style={styles.yaButton} onPress={() => router.push('/test/test13')}>
                        <Text style={styles.yaButtonText}>Ya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tidakButton}>
                        <Text style={styles.tidakButtonText}>Tidak</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
    },
    barTitle: {
        color: '#54c42e',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 600,
    },
    barContainer: {
        backgroundColor: '#fff',
        padding: 5,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    progressBarContainer: {
        flexDirection: 'row',
        width: '80%',
        height: 12,
        borderRadius: 6,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 8,
    },
    completedBar: {
        height: '100%',
        backgroundColor: '#54c42e',
        borderRadius: 6,
    },
    remainingBar: {
        height: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 6,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        padding: 16,
    },
    contentTitle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 600,
        marginBottom: 30,
    },
    yaButton: {
        backgroundColor: '#54c42e',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    yaButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tidakButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#54c42e',
    },
    tidakButtonText: {
        color: '#54c42e',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
