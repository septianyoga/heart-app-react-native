import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { Video } from 'expo-av';
import { getVideo } from '../../services/videoService';


export default function TestHealth() {
    const router = useRouter();
    const [videoData, setVideoData] = useState();

    const fetchVideo = async () => {
        try {
            const response = await getVideo();
            setVideoData(response.data);
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>

            <View style={styles.containerContent}>
                <Text style={styles.title}>
                    Yuk, Jawab beberapa pertanyaan berikut dan sebelumnya simak terlebih dahulu video nya agar dapat memahami cara pengisian
                </Text>
                <Text style={styles.subTitle}>
                    Dengan melanjutkan berarti anda dapat menyetujui syarat dan ketentuan.
                </Text>
                <Video
                    source={{ uri: videoData?.video }}
                    style={styles.video}
                    shouldPlay
                    useNativeControls={false}
                    resizeMode="cover" e
                    isLooping={true}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Mulai</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images//ilustrasi/test-ilustrasi.png')} style={styles.image} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2948b3',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 5,
        // paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderBottomWidth: 1
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 8,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
    },
    containerContent: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
        textAlign: 'justify',
        marginTop: 16,
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 12,
        color: 'white',
        textAlign: 'justify',
        marginBottom: 16,
    },
    video: {
        width: '100%',
        height: 200,
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#54c42e',
        padding: 10,
        marginVertical: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '100%',
        height: 450,
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})