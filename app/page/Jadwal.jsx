import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getJadwal } from '../../services/jadwalService';


export default function Jadwal() {
    const router = useRouter();
    const [jadwal, setJadwal] = useState([]);
    const scheduleData = [
        {
            id: '1',
            name: 'Dr. Wati',
            schedule: 'Senin - Rabu',
            time: '08.00 - 10.00',
            image: require('../../assets/images/user-3.jpg'),
            status: 'red',
        },
        {
            id: '2',
            name: 'Dr. Iqbal',
            schedule: 'Selasa - Kamis',
            time: '10.00 - 12.00',
            image: require('../../assets/images/user-3.jpg'),
            status: 'green',
        },
        {
            id: '3',
            name: 'Dr. Wati',
            schedule: 'Senin - Rabu',
            time: '08.00 - 10.00',
            image: require('../../assets/images/user-3.jpg'),
            status: 'red',
        },
        {
            id: '4',
            name: 'Dr. Iqbal',
            schedule: 'Selasa - Kamis',
            time: '10.00 - 12.00',
            image: require('../../assets/images/user-3.jpg'),
            status: 'green',
        },
        {
            id: '5',
            name: 'Dr. Wati',
            schedule: 'Senin - Rabu',
            time: '08.00 - 10.00',
            image: require('../../assets/images/user-3.jpg'),
            status: 'red',
        },
        {
            id: '6',
            name: 'Dr. Iqbal',
            schedule: 'Selasa - Kamis',
            time: '10.00 - 12.00',
            image: require('../../assets/images/user-3.jpg'),
            status: 'green',
        },
        {
            id: '7',
            name: 'Dr. Iqbal',
            schedule: 'Selasa - Kamis',
            time: '10.00 - 12.00',
            image: require('../../assets/images/user-3.jpg'),
            status: 'green',
        },
        // Add more data as needed
    ];

    const fetchJadwal = async () => {
        try {
            const response = await getJadwal();
            setJadwal(response.data);
        } catch (error) {
            console.error('Error fetching jadwal:', error);
        }
    };

    useEffect(() => {
        fetchJadwal();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.scheduleContainer}>
                <FlatList
                    data={jadwal}
                    keyExtractor={(item, index) => item.id + index}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.scheduleItem}>
                            <View style={styles.scheduleItemImage}>
                                <Image source={{ uri: item.foto }} style={styles.imageUserSchedule} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 600 }}>{item.nama_dokter}</Text>
                                <View style={styles.badgeContainer}>
                                    <View
                                        style={[styles.badgeStatus, { backgroundColor: item.sibuk == 1 ? 'red' : item.kosong == 1 ? 'green' : '', marginRight: 5 }]}
                                    />
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: 600, marginTop: 10 }}>Jadwal Dokter</Text>
                                <Text style={{ fontSize: 12, marginVertical: 5 }}>{item.hari_awal} - {item.hari_akhir}</Text>
                                <Text style={{ fontSize: 12, marginVertical: 5 }}>{item.jam_awal} - {item.jam_akhir}</Text>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={{
                        marginBottom: 100, // Memberikan ruang ekstra di bawah
                        justifyContent: 'center',
                        alignItems: 'start',
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                    }}
                    scrollEnabled={true} // Mengaktifkan scrolling
                    ListFooterComponent={
                        <View style={styles.containerFooter}>
                            <Text style={styles.footerText}>Keterangan</Text>
                            <Text style={styles.footerText}>Jadwal terupdate setiap hari</Text>
                            <View style={styles.badgeStatusContainer}>
                                <View style={styles.badgeSibuk}>
                                    <View style={[styles.badgeStatus, { backgroundColor: 'red', marginRight: 5 }]} />
                                    <Text style={styles.footerText}>Sibuk/Penuh</Text>
                                </View>
                                <View style={styles.badgeKosong}>
                                    <View style={[styles.badgeStatus, { backgroundColor: '#54c42e', marginRight: 5 }]} />
                                    <Text style={styles.footerText}>Kosong/Tersedia</Text>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 5,
        // paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 8,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 5,
    },
    navButton: {
        width: '50%',
        backgroundColor: '#fff',
        // borderRadius: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        // paddingHorizontal: 5,
        alignItems: 'center',
    },
    navTitle: {
        color: '#54c42e',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    scheduleContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scheduleItem: {
        padding: 10,
    },
    scheduleItemImage: {
        width: 160,
        height: 160,
        borderRadius: 10,
        marginRight: 20,
    },
    imageUserSchedule: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    badgeStatus: {
        width: 20,
        height: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerFooter: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    footerText: {
        color: '#000',
        fontSize: 12,
        textAlign: 'center',
    },
    badgeStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    badgeSibuk: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeKosong: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})