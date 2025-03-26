import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Antrian() {
    const [searchText, setSearchText] = useState('');
    const [isAntrian, setIsAntrian] = useState(true);
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
        { id: '6', nama: 'Antrian A006' },
        { id: '6', nama: 'Antrian A006' },
        { id: '6', nama: 'Antrian A006' },
    ];

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

    const handlePress = (item) => {
        alert(`Kamu memilih ${item.nama}`);
    };

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
                    <Text style={[styles.navTitle, { color: '#000' }]}>Lihat Antrian</Text>
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
                    <Text style={[styles.navTitle, { color: '#000' }]}>Lihat Test</Text>
                </TouchableOpacity>
            </View>

            {isAntrian && (
                <>
                    <View style={styles.containerContent}>
                        {/* <Text style={styles.title}>
                            ANTRIAN
                        </Text> */}
                        {/* <View style={styles.searchContainer}>
                            <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Cari Antrian"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                        </View> */}
                    </View>
                    <FlatList
                        data={dataAntrian}
                        keyExtractor={(item, index) => item.id + index}
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>{item.nama}</Text>
                                <TouchableOpacity style={styles.cardButton} onPress={() => handlePress(item)}>
                                    <Text style={styles.cardButtonText}>Ambil Antrian</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        contentContainerStyle={{
                            marginBottom: 100,
                            justifyContent: 'center',
                            alignItems: 'start',
                        }}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                        }}
                        scrollEnabled={true}
                    />
                </>
            )}
            {!isAntrian && (
                <>
                    <View style={styles.scheduleContainer}>
                        <FlatList
                            data={scheduleData}
                            keyExtractor={(item, index) => item.id + index}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.scheduleItem}>
                                    <View style={styles.scheduleItemImage}>
                                        <Image source={item.image} style={styles.imageUserSchedule} />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 600 }}>{item.name}</Text>
                                        <View style={styles.badgeContainer}>
                                            <View
                                                style={[styles.badgeStatus, { backgroundColor: item.status, marginRight: 5 }]}
                                            />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 600, marginTop: 10 }}>Jadwal Dokter</Text>
                                        <Text style={{ fontSize: 12, marginVertical: 5 }}>{item.schedule}</Text>
                                        <Text style={{ fontSize: 12, marginVertical: 5 }}>{item.time}</Text>
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