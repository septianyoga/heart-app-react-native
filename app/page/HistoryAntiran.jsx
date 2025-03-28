import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { getCurrentAntrian, getHistoryAntrian } from '../../services/antrianService';
import { getData } from '../../services/storageService';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryAntiran() {
    const [currentAntrian, setCurrentAntrian] = useState(null);
    const [historyAntrian, setHistoryAntrian] = useState([]);

    const dataAntrianHangus = [
        { id: '1', nama: 'Antrian A001' },
        { id: '2', nama: 'Antrian A002' },
        { id: '2', nama: 'Antrian A002' },
        { id: '2', nama: 'Antrian A002' },
        { id: '2', nama: 'Antrian A002' },
        { id: '2', nama: 'Antrian A002' },
        { id: '2', nama: 'Antrian A002' },
        { id: '2', nama: 'Antrian A003' },
    ]

    const fetchCurrentAntrian = async () => {
        try {
            const user = await getData('user');
            const response = await getCurrentAntrian(user.id);
            setCurrentAntrian(response.data);
        } catch (error) {
            console.error('Error fetching antrian:', error);
        }
    }

    const fetchHistoryAntrian = async () => {
        try {
            const user = await getData('user');
            const response = await getHistoryAntrian(user.id);
            setHistoryAntrian(response.data);
        } catch (error) {
            console.error('Error fetching antrian:', error);
        }
    }

    useEffect(() => {
        fetchCurrentAntrian();
        fetchHistoryAntrian();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCurrentAntrian();
            fetchHistoryAntrian();
        }, [])
    );

    return (
        <>
            <View style={styles.antrianThis}>
                <View style={[styles.card, { width: '100%', height: 100, backgroundColor: currentAntrian ? '#54c42e' : 'red' }]}>
                    {currentAntrian && (
                        <Text style={[styles.cardTitle, { marginBottom: -5, marginTop: -5 }]}>Antrian {currentAntrian.no_antrian}</Text>
                    )}
                    <View style={[styles.cardButton]}>
                        <Text style={[styles.cardButtonText]}>
                            {currentAntrian ? 'Antrian Kamu' : 'Belum ada antrian'}
                        </Text>
                        {!currentAntrian && (
                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                                Silahkan ambil antrian terlebih dahulu
                            </Text>
                        )}
                        {currentAntrian && (
                            <View style={[styles.badge, { backgroundColor: 'orange', borderRadius: 7, paddingHorizontal: 6, paddingVertical: 2, marginTop: 5 }]}>
                                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                                    {currentAntrian.status == 1 ? 'Menunggu Dipanggil' : 'Dipanggil'}
                                </Text>
                            </View>
                        )}
                    </View>

                </View>
            </View >
            <View style={styles.antrianHangus}>
                <FlatList
                    data={historyAntrian}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={[styles.card, { backgroundColor: 'red' }]}>
                            <Text style={styles.cardTitle}>Antrian {item.no_antrian}</Text>
                            <View style={[styles.cardButton]}>
                                <Text style={styles.cardButtonText}>Antrian Hangus</Text>
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 10, color: 'white' }}>
                                pada {new Date(item.updated_at).toLocaleString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <View style={[styles.badge, { backgroundColor: item.status == 3 ? '#54c42e' : 'gray', borderRadius: 7, paddingHorizontal: 6, paddingVertical: 2, marginTop: 5, alignContent: 'center', width: 'auto' }]}>
                                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
                                    {item.status == 3 ? 'Selesai' : 'Dilewati'}
                                </Text>
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
                    scrollEnabled={true}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#54c42e',
        padding: 15,
        borderRadius: 10,
        margin: 8,  // Space between cards
        width: '45%',  // Ensures two cards fit per row
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 0,
        textAlign: 'center',
    },
    cardButton: {
        paddingVertical: 2,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    cardButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    antrianThis: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    antrianHangus: {
        flex: 1,
        padding: 0,
    },
})