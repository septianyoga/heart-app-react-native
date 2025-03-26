import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { getBerita } from '../../services/beritaService';

export default function Berita() {
    const [berita, setBerita] = useState([]);
    const flatListRef = useRef(null); // Reference to FlatList
    const router = useRouter();



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
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Heart App</Text>
                    </View>

                    <View style={styles.educationContainer}>
                        <View style={styles.navEducation}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Education</Text>
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
                                        <View style={styles.educationItem}>
                                            <View style={styles.educationItemImage}>
                                                <Image source={{ uri: item.foto }} style={styles.educationImage} />
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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 10,
        // paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 10,
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
