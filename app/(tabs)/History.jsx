import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

export default function History() {
    const [searchText, setSearchText] = useState('');
    const [isAntrian, setIsAntrian] = useState(true);
    const router = useRouter();

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
    const itemsAntrian = [
        { id: '1', nama: 'Antrian A001' },
    ]
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>
            <View style={styles.navContainer}>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        isAntrian && {
                            borderRightWidth: 1,
                            borderRightColor: '#ccc',
                            backgroundColor: '#54c42e',
                            opacity: 0.5
                        }
                    ]}
                    onPress={() => setIsAntrian(true)}
                >
                    <Text style={[styles.navTitle, { color: '#000' }]}>History Antrian</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        !isAntrian && {
                            borderRightWidth: 1,
                            borderRightColor: '#ccc',
                            backgroundColor: '#54c42e',
                            opacity: 0.5
                        }
                    ]}
                    onPress={() => setIsAntrian(false)}
                >
                    <Text style={[styles.navTitle, { color: '#000' }]}>History Test</Text>
                </TouchableOpacity>
            </View>
            {isAntrian && (
                <>
                    <View style={styles.containerContent}>
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
                    <View style={styles.antrianThis}>
                        {itemsAntrian.map(item => (
                            <View key={item.id} style={[styles.card, { width: '100%', height: 100 }]}>
                                <Text style={[styles.cardTitle, { marginBottom: -5 }]}>{item.nama}</Text>
                                <View style={[styles.cardButton]}>
                                    <Text style={[styles.cardButtonText]}>Antrian Kamu</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.antrianHangus}>
                        <FlatList
                            data={dataAntrianHangus}
                            keyExtractor={(item, index) => item.id + index}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <View style={[styles.card, { backgroundColor: 'red' }]}>
                                    <Text style={styles.cardTitle}>{item.nama}</Text>
                                    <View style={[styles.cardButton]}>
                                        <Text style={styles.cardButtonText}>Antrian Hangus</Text>
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
            )}
            {!isAntrian && (
                <>
                    <View style={styles.containerContent}>
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
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    cardButton: {
        paddingVertical: 8,
        borderRadius: 5,
        marginVertical: 10,
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