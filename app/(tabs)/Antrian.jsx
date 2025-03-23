import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Antrian() {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const dataAntrian = [
        { id: '1', nama: 'Antrian A001' },
        { id: '2', nama: 'Antrian A002' },
        { id: '3', nama: 'Antrian A003' },
        { id: '4', nama: 'Antrian A004' },
        { id: '5', nama: 'Antrian A005' },
        { id: '6', nama: 'Antrian A006' },
        { id: '6', nama: 'Antrian A006' },
        { id: '6', nama: 'Antrian A006' },
        { id: '6', nama: 'Antrian A006' },
        { id: '6', nama: 'Antrian A006' },
        { id: '6', nama: 'Antrian A006' },
    ];

    const handlePress = (item) => {
        alert(`Kamu memilih ${item.nama}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>
            <View style={styles.navContainer}>
                <TouchableOpacity
                    style={[styles.navButton, { borderRightWidth: 1, borderRightColor: '#ccc' }]}
                    onPress={() => router.push('/(tabs)/home')}
                >
                    <Text style={styles.navTitle}>Lihat Antrian</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => router.push('/(tabs)/antrian')}
                >
                    <Text style={styles.navTitle}>Lihat Jadwal</Text>
                </TouchableOpacity>
            </View>

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

               <FlatList
                    data={dataAntrian}
                    keyExtractor={(item, index) => item.id + index}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}  // Disable horizontal scrollbar
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item.nama}</Text>
                            <TouchableOpacity style={styles.cardButton} onPress={() => handlePress(item)}>
                                <Text style={styles.cardButtonText}>Ambil Antrian</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={{
                        marginBottom: 20, 
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />

            </View>
        </SafeAreaView>
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
    containerContent: {
        padding: 10,
        marginBottom: 50,
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
        marginBottom: 20,
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