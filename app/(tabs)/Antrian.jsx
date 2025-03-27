import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import Jadwal from '../page/Jadwal';
import AntrianComponent from '../page/Antrian';


export default function Antrian() {

    const router = useRouter();
    const [isAntrian, setIsAntrian] = useState(true);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>
            <View style={styles.navContainer}>
                <TouchableOpacity
                    style={[styles.navButton, isAntrian && {
                        borderRightWidth: 1,
                        borderRightColor: '#ccc',
                        backgroundColor: '#54c42e',
                        opacity: 0.5
                    }]}
                    onPress={() => setIsAntrian(true)}
                >
                    <Text style={[styles.navTitle, { color: '#000' }]}>Lihat Antrian</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navButton, !isAntrian && {
                        borderRightWidth: 1,
                        borderRightColor: '#ccc',
                        backgroundColor: '#54c42e',
                        opacity: 0.5
                    }]}
                    onPress={() => setIsAntrian(false)}
                >
                    <Text style={[styles.navTitle, { color: '#000' }]}>Lihat Jadwal</Text>
                </TouchableOpacity>
            </View>
            {isAntrian && (
                <>
                    <AntrianComponent />
                </>
            )}
            {!isAntrian && (
                <>
                    <Jadwal />
                </>
            )}
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