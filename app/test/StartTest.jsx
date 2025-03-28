import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { sendTest } from '../../services/testService';
import { getData } from '../../services/storageService';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default function StartTest() {
    const questions = [
        'Tekanan Darah (Sistole) > 140',
        'Kegemukan',
        'Perokok',
        'Mempunyai Riwayat Penyakit Jantung',
        'Mempunyai Riwayat Penyakit Hiperkolesterol',
        'Mempunyai Riwayat Kencing Manis',
        'Mempunyai Riwayat Stroke',
        'Mempunyai Riwayat Keluhan Nyeri Dada Khas Angina',
        'Nyeri Dada Menjalar Punggung Leher Bahu dan Epigastrium',
        'Keringat Dingin Tanpa Sebab',
        'Mudah Lelah',
        'Nyeri epigastrium'
    ]

    const router = useRouter();
    const [ageCount, setAgeCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 13;
    const [selectedGender, setSelectedGender] = useState('');
    const [answers, setAnswers] = useState({});

    const progressWidth = (currentPage / totalPages) * 100;

    const incrementAgeCount = () => setAgeCount(prev => prev + 1);
    const decrementAgeCount = () => setAgeCount(prev => Math.max(prev - 1, 0));
    const handleInputChange = (text) => setAgeCount(isNaN(parseInt(text)) ? 0 : parseInt(text));
    const handleGenderSelect = (gender) => setSelectedGender(gender);

    const handleAnswer = (answer) => {
        setAnswers(prev => ({ ...prev, [currentPage]: answer }));
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (!answers[currentPage]) {
            Alert.alert("Pilih Jawaban", "Silakan pilih 'Ya' atau 'Tidak' sebelum lanjut.");
            return;
        }
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handleFinish = () => {
        if (!answers['13']) {
            Alert.alert("Perhatian", "Anda harus mengisi kuisioner terakhir terlebih dahulu.");
            return;
        }

        if (ageCount === 0) {
            Alert.alert("Perhatian", "Anda harus mengisi umur terlebih dahulu.");
            return;
        }

        if (!selectedGender) {
            Alert.alert("Perhatian", "Anda harus mengisi jenis kelamin terlebih dahulu.");
            return;
        }

        Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menyelesaikan kuisioner?", [
            { text: "Batal", style: "cancel" },
            { text: "Ya", onPress: async () => await sendKuisioner() },
        ]);
    };

    const sendKuisioner = async () => {
        try {
            const user = await getData('user');
            const data = {
                user_id: user.id,
                age: ageCount,
                gender: selectedGender,
                soal: answers
            }
            const response = await sendTest(data)
            if (response.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Kuisioner berhasil dikirim',
                    button: 'close',
                })
                return router.push({ pathname: '/result/report', params: response.data });
            }
            return Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Gagal',
                textBody: response.message,
                button: 'close',
            })
        } catch (error) {
            console.log('error gan: ', error);
        }
        // router.push('/result/report', {  });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}><Text style={styles.headerTitle}>Heart App</Text></View>

            <View style={styles.barContainer}>
                <Text style={styles.barTitle}>Kuisioner</Text>
                <View style={styles.bar}>
                    <TouchableOpacity onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                        <Ionicons name="arrow-back" size={24} color="#54c42e" />
                    </TouchableOpacity>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.completedBar, { width: `${progressWidth}%` }]} />
                        <View style={[styles.remainingBar, { width: `${100 - progressWidth}%` }]} />
                    </View>
                    <TouchableOpacity onPress={handleNext}>
                        <Ionicons name="arrow-forward" size={24} color="#54c42e" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {currentPage === 1 ? (
                    <>
                        <View style={styles.itemContent}>
                            <Text style={styles.contentTitle}>Umur</Text>
                            <View style={styles.ageContainer}>
                                <TouchableOpacity style={styles.button} onPress={decrementAgeCount}><Text style={styles.buttonText}>-</Text></TouchableOpacity>
                                <TextInput style={styles.input} value={ageCount.toString()} keyboardType="numeric" onChangeText={handleInputChange} />
                                <TouchableOpacity style={styles.button} onPress={incrementAgeCount}><Text style={styles.buttonText}>+</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.contentTitle}>Jenis Kelamin</Text>
                            <View style={styles.genderContainer}>
                                <TouchableOpacity style={[styles.optionButton, selectedGender === 'Wanita' && styles.selectedButton]} onPress={() => handleGenderSelect('Wanita')}>
                                    <Ionicons name="female" size={134} color={selectedGender === 'Wanita' ? 'white' : '#54c42e'} />
                                    <Text style={[styles.optionText, selectedGender === 'Wanita' && styles.selectedButtonText]}>Wanita</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.optionButton, selectedGender === 'Laki-Laki' && styles.selectedButton]} onPress={() => handleGenderSelect('Laki-Laki')}>
                                    <Ionicons name="male" size={134} color={selectedGender === 'Laki-Laki' ? 'white' : '#54c42e'} />
                                    <Text style={[styles.optionText, selectedGender === 'Laki-Laki' && styles.selectedButtonText]}>Laki-Laki</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.submitButton} onPress={() => setCurrentPage(2)}><Text style={styles.submitButtonText}>Lanjut</Text></TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.content}>
                        <Text style={styles.contentTitle}>{questions[currentPage - 2]}</Text>
                        <View>
                            <TouchableOpacity style={[styles.yaButton, answers[currentPage] === 'Ya' && styles.selectedAnswer]} onPress={() => handleAnswer('Ya')}>
                                <Text style={styles.yaButtonText}>Ya</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tidakButton, answers[currentPage] === 'Tidak' && styles.selectedAnswer]} onPress={() => handleAnswer('Tidak')}>
                                <Text style={styles.tidakButtonText}>Tidak</Text>
                            </TouchableOpacity>
                        </View>
                        {currentPage === totalPages && (
                            <TouchableOpacity style={styles.submitButton} onPress={handleFinish}>
                                <Text style={styles.submitButtonText}>Selesai</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { backgroundColor: '#54c42e', padding: 5, alignItems: 'center' },
    headerTitle: { color: 'white', fontSize: 20, fontWeight: '600' },
    barContainer: { padding: 5 },
    barTitle: { color: '#54c42e', fontSize: 20, textAlign: 'center', fontWeight: '600' },
    bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingHorizontal: 16 },
    progressBarContainer: { flexDirection: 'row', width: '80%', height: 12, borderRadius: 6, backgroundColor: '#e0e0e0', marginHorizontal: 8 },
    completedBar: { height: '100%', backgroundColor: '#54c42e', borderRadius: 6 },
    remainingBar: { height: '100%', backgroundColor: '#e0e0e0', borderRadius: 6 },
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
    answerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    answerButton: { backgroundColor: '#54c42e', padding: 10, borderRadius: 5, marginHorizontal: 10 },
    answerText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    selectedAnswer: { backgroundColor: '#2e7d32' },
    yaButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#54c42e',
    },
    yaButtonText: {
        color: '#54c42e',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tidakButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#54c42e',
    },
    tidakButtonText: {
        color: '#54c42e',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
