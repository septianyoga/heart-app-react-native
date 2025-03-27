import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getJadwal } from '../../services/jadwalService';

// Get screen width and height
const { width, height } = Dimensions.get('window');

export default function Jadwal() {
    const router = useRouter();
    const [jadwal, setJadwal] = useState([]);

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
                                <Text style={styles.scheduleName}>{item.nama_dokter}</Text>
                                <View style={styles.badgeContainer}>
                                    <View
                                        style={[styles.badgeStatus, { backgroundColor: item.sibuk == 1 ? 'red' : item.kosong == 1 ? 'green' : '', marginRight: 5 }]}
                                    />
                                </View>
                                <Text style={styles.scheduleText}>Jadwal Dokter</Text>
                                <Text style={styles.scheduleText}>{item.hari_awal} - {item.hari_akhir}</Text>
                                <Text style={styles.scheduleText}>{item.jam_awal} - {item.jam_akhir}</Text>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={styles.flatListContainer}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    scrollEnabled={true}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    scheduleContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scheduleItem: {
        padding: 10,
        width: (width - 30) / 2, // Making the schedule items responsive based on screen width
        marginBottom: 15, // Adjust the spacing between items
    },
    scheduleItemImage: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        marginBottom: 10,
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
    scheduleName: {
        fontSize: 16,
        fontWeight: '600',
    },
    scheduleText: {
        fontSize: 12,
        marginVertical: 5,
    },
    flatListContainer: {
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'start',
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
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
    },
});
