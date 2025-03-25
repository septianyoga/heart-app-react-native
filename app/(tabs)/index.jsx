import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { getBerita } from '../../services/beritaService';

export default function HomeScreen() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [berita, setBerita] = useState([]);
    const flatListRef = useRef(null); // Reference to FlatList
    const router = useRouter();

    // Sample data for the schedule
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
        // Add more data as needed
    ];

    const handlePaginationClick = (index) => {
        setActiveIndex(index);
        flatListRef.current.scrollToIndex({ index }); // Scroll to the clicked item
    };

    const fetchBerita = async () => {
        try {
            const response = await getBerita();
            setBerita(response.data);
        } catch (error) {
            console.error('Error fetching berita:', error);
        }
    }

    useEffect(() => {
        fetchBerita();
    }, []);

    return (
        <FlatList
            ref={flatListRef}
            contentContainerStyle={{ flexGrow: 1 }}
            data={[1]} // Add a dummy data array to ensure FlatList renders
            renderItem={() => (
                <View style={style.container}>
                    <View style={style.header}>
                        <Image source={require('../../assets/images/ilustrasi/char.png')} style={style.imageIlustration} />
                    </View>

                    <View style={style.schedule}>
                        <FlatList
                            horizontal
                            data={scheduleData}
                            renderItem={({ item, index }) => (
                                <View style={style.scheduleItem}>
                                    <View style={style.scheduleItemImage}>
                                        <Image source={item.image} style={style.imageUserSchedule} />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 600 }}>{item.name}</Text>
                                        <View style={style.badgeContainer}>
                                            <View
                                                style={[style.badgeStatus, { backgroundColor: item.status, marginRight: 5 }]}
                                            />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 600, marginTop: 10 }}>Jadwal Dokter</Text>
                                        <Text style={{ fontSize: 12, marginVertical: 5 }}>{item.schedule}</Text>
                                        <Text style={{ fontSize: 12, marginVertical: 5 }}>{item.time}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={400}
                            decelerationRate="fast"
                            pagingEnabled
                            onScroll={(event) => {
                                const contentOffsetX = event.nativeEvent.contentOffset.x;
                                const index = Math.floor(contentOffsetX / 400); // Assuming each item width is 400
                                setActiveIndex(index);
                            }}
                        />
                        {/* Pagination */}
                        <View style={style.paginationContainer}>
                            {scheduleData.map((_, index) => (
                                <TouchableOpacity key={index} onPress={() => handlePaginationClick(index)}>
                                    <View
                                        style={[
                                            style.paginationDot,
                                            {
                                                backgroundColor: activeIndex === index ? 'green' : 'gray',
                                                opacity: activeIndex === index ? 1 : 0.5, // Inactive dots are less opaque
                                            },
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={style.educationContainer}>
                        <View style={style.navEducation}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Education</Text>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={style.linkText}>See All</Text>
                                    <FontAwesome name="angle-right" size={16} color="black" style={{ marginLeft: 5 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={berita}
                            renderItem={({ item }) => {
                                // Format the created_at field
                                const formattedTime = formatDistanceToNow(new Date(item.created_at), {
                                    addSuffix: true,
                                    locale: id, // Format in Indonesian
                                });

                                return (
                                    // <TouchableOpacity onPress={() => router.push({ pathname: "/berita/" + item.id, params: item })}>
                                    <TouchableOpacity onPress={() => router.push({ pathname: `/berita/${item.id}`, params: item })}>
                                        <View style={style.educationItem}>
                                            <View style={style.educationItemImage}>
                                                <Image source={{ uri: item.foto }} style={style.educationImage} />
                                            </View>
                                            <View>
                                                <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 14, fontWeight: 600 }}>{item.judul}</Text>
                                                <View style={{ width: 200 }}>
                                                    <Text style={{ fontSize: 12, marginVertical: 5 }} numberOfLines={1}>
                                                        {item.isi}
                                                    </Text>
                                                </View>
                                                <Text style={{ fontSize: 12 }}>{formattedTime}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
        />
    );
}

const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: '100%',
        height: 400,
        padding: 20,
        backgroundColor: '#2948b3',
    },
    imageIlustration: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    schedule: {
        padding: 20,
    },
    scheduleItem: {
        flexDirection: 'row',
        alignItems: 'start',
        width: 400,
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 2,
    },
    educationContainer: {
        padding: 20,
    },
    navEducation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    linkText: {
        fontSize: 14,
    },
    educationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        width: 200,
    },
    educationItemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
    },
    educationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
});
