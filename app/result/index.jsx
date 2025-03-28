import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

export default function Result() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Data item tunggal
    const item = { status: 'red', points: 50 }; // Update points accordingly

    // Total bars and how many should be filled
    const totalBars = 8; // Total number of bars to show
    const filledBars = Math.ceil((params.score / 12) * totalBars); // Calculate how many bars should be filled

    const barColor = params.score < 12 ? '#54c42e' : 'red'; // Set bar color based on status

    // Data for answer items
    const answers = [
        { label: 'Umur', value: '20 tahun' },
        { label: 'Jenis Kelamin', value: 'Pria' },
        { label: 'Pekerjaan', value: 'Mahasiswa' },
        // Add more items as needed
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.containerContent}>
                    <Text style={[styles.point, params.score < 12 ? { color: '#54c42e' } : { color: 'red' }]}>
                        {params.score}<Text style={[styles.point2]}>pt</Text>
                    </Text>
                    <View style={styles.badgeContainer}>
                        <View
                            style={[
                                styles.badge,
                                params.score < 12
                                    ? { backgroundColor: '#54c42e' }
                                    : { backgroundColor: 'red' },
                            ]}
                        />
                        <Text style={[styles.cardTextTest]}>
                            {params.score < 12 ? 'Low Risk' : 'High Risk'}
                        </Text>
                    </View>

                    {/* Vertical Bars */}
                    <View style={styles.barContainer}>
                        {[...Array(totalBars)].map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.verticalBar,
                                    index < filledBars
                                        ? { backgroundColor: barColor } // Use green or red based on status
                                        : { backgroundColor: '#ccc' }, // Gray if not filled
                                ]}
                            />
                        ))}
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <View style={[styles.badgeInfo, { backgroundColor: '#54c42e' }]} />
                            <Text style={styles.infoTextInfo}>{'<'}12 Low Risk</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <View style={[styles.badgeInfo, { backgroundColor: 'red' }]} />
                            <Text style={styles.infoTextInfo}>{'>'}12 High Risk</Text>
                        </View>
                    </View>
                    <Text style={styles.infoText}>
                        {params.score < 12 ? 'Score Rendah : Tidak perlu dilakukan perawatan di Rumah Sakit' : 'Score Tinggi : Segera dilakukan perawatan di Rumah Sakit'}
                    </Text>

                    <View style={styles.answerItem}>
                        <Text style={[styles.answerText, { marginBottom: 25 }]}>Umur</Text>
                        <Text style={[styles.answerText, { color: '#fff' }]}>{params.age}</Text>
                    </View>
                    <View style={styles.answerItem}>
                        <Text style={[styles.answerText, { marginBottom: 25 }]}>Jenis Kelamin</Text>
                        <Text style={[styles.answerText, { color: '#fff' }]}>{params.gender == 1 ? 'Pria' : 'Wanita'}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => Alert.alert('Comming Soon', 'Fitur ini sedang dalam pengembangan')}
                    >
                        <Ionicons name="cloud-download" size={24} color="white" style={styles.icon} />
                        <Text style={styles.buttonText}>Download PDF</Text>
                    </TouchableOpacity>
                </View>

                {/* Download PDF Button */}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 10,
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
        top: 10,
    },
    scrollView: {
        flex: 1,
    },
    containerContent: {
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    point: {
        fontSize: 115,
        fontWeight: 800,
        marginTop: 10,
        textAlign: 'center',
    },
    point2: {
        fontSize: 45,
        fontWeight: 600,
        color: '#000',
    },
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    badge: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        marginRight: 5,
    },
    cardTextTest: {
        fontSize: 34,
        fontWeight: 600,
        color: '#000',
    },
    barContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    verticalBar: {
        width: 27,
        borderRadius: 10,
        height: 75,
        marginHorizontal: 2,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 30,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeInfo: {
        width: 20,
        height: 20,
        borderRadius: 30,
        marginRight: 5,
    },
    infoTextInfo: {
        fontSize: 14,
        fontWeight: 600,
        color: '#000',
    },
    infoText: {
        fontSize: 16,
        fontWeight: 800,
        color: '#000',
        textAlign: 'center',
        marginTop: 15,
    },
    answerItem: {
        backgroundColor: '#fc84b2',
        padding: 25,
        marginTop: 30,
        borderRadius: 10,
    },
    answerText: {
        fontSize: 18,
        fontWeight: 800,
        color: '#000',
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 5, // Space between icon and text
    },
    icon: {
        marginRight: 5, // Space between icon and text
    },
});
