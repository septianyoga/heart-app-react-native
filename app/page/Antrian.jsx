import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getAntrian } from '../../services/antrianService';

export default function AntrianComponent() {
    const [searchText, setSearchText] = useState('');
    const [antrian, setAntrian] = useState([]);

    const fetchAntrian = async () => {
        try {
            const response = await getAntrian();
            setAntrian(response.data);
        } catch (error) {
            console.error('Error fetching antrian:', error);
        }
    };

    useEffect(() => {
        fetchAntrian();
    }, []);

    return (
        <View>
            <View style={styles.containerContent}>
                <Text style={styles.title}>
                    ANTRIAN
                </Text>
                <View style={styles.searchContainer}>
                    <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari Antrian"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>
            <FlatList
                data={antrian}
                keyExtractor={(item, index) => item.id + index}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Antrian {`A${('00' + item.id).slice(-3)}`}</Text>
                        <TouchableOpacity style={styles.cardButton} onPress={() => handlePress(item)}>
                            <Text style={styles.cardButtonText}>Ambil Antrian</Text>
                        </TouchableOpacity>
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
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerContent: {
        padding: 10,
        flexGrow: 1,
        overflow: 'hidden',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 600,
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
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
        marginBottom: 15,
        textAlign: 'center',
    },
    cardSubtitle: {
        fontSize: 14,
        marginBottom: 10,
        color: '#666',
    },
    cardButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardButtonText: {
        color: '000',
        fontWeight: 'bold',
    },
})