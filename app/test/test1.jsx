import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Test1() {
    const router = useRouter();
    const [ageCount, setAgeCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 12;
    const [selectedGender, setSelectedGender] = useState('');

    const progressWidth = (currentPage / totalPages) * 100;

    // Fungsi untuk menambah angka
    const incrementAgeCount = () => {
        setAgeCount(prevCount => prevCount + 1);
    };

    // Fungsi untuk mengurangi angka
    const decrementAgeCount = () => {
        setAgeCount(prevCount => Math.max(prevCount - 1, 0));
    };

    // Fungsi untuk mengubah angka secara manual
    const handleInputChange = (text) => {
        const value = parseInt(text);
        if (!isNaN(value)) {
            setAgeCount(value);
        }
    };
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>

            <View style={styles.barContainer}>
                <Text style={styles.barTitle}>Kuisioner</Text>
                <View style={styles.bar}>
                    <TouchableOpacity onPress={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}>
                        <Ionicons name="arrow-back" size={24} color="#54c42e" />
                    </TouchableOpacity>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.completedBar, { width: `${progressWidth}%` }]} />
                        <View style={[styles.remainingBar, { width: `${100 - progressWidth}%` }]} />
                    </View>
                    <TouchableOpacity onPress={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}>
                        <Ionicons name="arrow-forward" size={24} color="#54c42e" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.itemContent}>
                    <Text style={styles.contentTitle}>Umur</Text>
                    <View style={styles.ageContainer}>
                        <TouchableOpacity style={styles.button} onPress={decrementAgeCount}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            value={ageCount.toString()}
                            keyboardType="numeric"
                            onChangeText={handleInputChange}
                        />

                        <TouchableOpacity style={styles.button} onPress={incrementAgeCount}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.contentTitle}>Jenis Kelamin</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                selectedGender === 'Wanita' && styles.selectedButton,
                            ]}
                            onPress={() => handleGenderSelect('Wanita')}
                        >
                            <Ionicons name="female" size={134} color={selectedGender === 'Wanita' ? 'white' : '#54c42e'} />
                            <Text style={[styles.optionText, selectedGender === 'Wanita' && styles.selectedButtonText]}>
                                Wanita
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                selectedGender === 'Laki-Laki' && styles.selectedButton,
                            ]}
                            onPress={() => handleGenderSelect('Laki-Laki')}
                        >
                            <Ionicons name="male" size={134} color={selectedGender === 'Laki-Laki' ? 'white' : '#54c42e'} />
                            <Text style={[styles.optionText, selectedGender === 'Laki-Laki' && styles.selectedButtonText]}>
                                Laki-Laki
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/test/test2')}>
                    <Text style={styles.submitButtonText}>Lanjut</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#54c42e',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
    },
    barTitle: {
        color: '#54c42e',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 600,
    },
    barContainer: {
        backgroundColor: '#fff',
        padding: 5,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    progressBarContainer: {
        flexDirection: 'row',
        width: '80%',
        height: 12,
        borderRadius: 6,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 8,
    },
    completedBar: {
        height: '100%',
        backgroundColor: '#54c42e',
        borderRadius: 6,
    },
    remainingBar: {
        height: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 6,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        padding: 16,
    },
    itemContent: {
        marginVertical: 10,
    },
    contentTitle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 600,
        marginBottom: 30,
    },
    ageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#54c42e',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    optionButton: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#54c42e',
        padding: 10,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    selectedButton: {
        backgroundColor: '#54c42e',
    },
    selectedButtonText: {
        color: '#fff',
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#54c42e',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: '#54c42e',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
