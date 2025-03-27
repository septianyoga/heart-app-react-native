import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

export default function HistoryTest() {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const dataTest = [
        { id: '1', value: '10', status: 'green', date: '24 November 2025', time: '20:00' },
        { id: '2', value: '30', status: 'red', date: '24 November 2025', time: '20:00' },
        { id: '3', value: '14', status: 'green', date: '24 November 2025', time: '20:00' },
        { id: '4', value: '20', status: 'red', date: '24 November 2025', time: '20:00' },
        { id: '5', value: '14', status: 'green', date: '24 November 2025', time: '20:00' },
        { id: '6', value: '20', status: 'red', date: '24 November 2025', time: '20:00' },
    ]

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari Test History"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                <FlatList
                    data={dataTest}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={[styles.cardTitle, item.status === 'green' ? { color: '#54c42e' } : { color: 'red' }]}>
                                    {item.value}
                                    <Text style={styles.cardTitle2}>pt</Text>
                                </Text>
                                <View style={styles.cardInfo}>
                                    <View style={[styles.badge, item.status === 'green' ? { backgroundColor: '#54c42e' } : { backgroundColor: 'red' }]}></View>
                                    <Text style={[styles.cardText, item.status === 'green' ? { color: '#54c42e' } : { color: 'red' }]}>{item.status === 'green' ? 'Low Risk' : 'High Risk'}</Text>
                                </View>
                                <View style={styles.cardDate}>
                                    <Text style={styles.date}>{item.date}</Text>
                                    <Text style={styles.time}>{item.time}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 10,
        marginTop: 10
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 26,
        color: '#54c42e',
        fontWeight: '800',
        marginBottom: 5,
        textAlign: 'center',
    },
    cardTitle2: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
        marginBottom: 5,
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    badge: {
        backgroundColor: '#54c42e',
        borderRadius: 5,
        width: 10,
        height: 10,
        marginRight: 5,
    },
    badgeText: {
        fontSize: 14,
        color: '#54c42e',
    },
    cardDate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    date: {
        fontSize: 14,
        color: '#000',
    },
    time: {
        fontSize: 14,
        color: '#000',
    }
})