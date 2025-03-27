import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import HistoryAntiran from '../page/HistoryAntiran';
import HistoryTest from '../page/HistoryTest';

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
    const dataTest = [
        { id: '1', value: '10', status: 'green', date: '24 November 2025', time: '20:00' },
        { id: '2', value: '30', status: 'red', date: '24 November 2025', time: '20:00' },
        { id: '3', value: '14', status: 'green', date: '24 November 2025', time: '20:00' },
        { id: '4', value: '20', status: 'red', date: '24 November 2025', time: '20:00' },
        { id: '5', value: '14', status: 'green', date: '24 November 2025', time: '20:00' },
        { id: '6', value: '20', status: 'red', date: '24 November 2025', time: '20:00' },
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
                    <HistoryAntiran />
                </>
            )}
            {!isAntrian && (
                <>
                    <HistoryTest />
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
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cardTest: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
    },
    cardContentTest: {
        padding: 10,
    },
    cardTitleTest: {
        fontSize: 26,
        color: '#54c42e',
        fontWeight: '800',
        marginBottom: 5,
        textAlign: 'center',
    },
    cardTitle2Test: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
        marginBottom: 5,
    },
    cardInfoTest: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    cardDateTest: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    badge: {
        backgroundColor: '#54c42e',
        borderRadius: 5,
        width: 10,
        height: 10,
        marginRight: 5,
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