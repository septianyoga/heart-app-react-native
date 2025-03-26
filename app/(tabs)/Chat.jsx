import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Chat() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>

            <ScrollView contentContainerStyle={styles.chatContainer} showsVerticalScrollIndicator={false}>
                {/* Chat Messages */}
                <View style={[styles.messageContainer, styles.adminMessage]}>
                    <Text style={styles.botText}>Halo, ada yang bisa saya bantu?</Text>
                </View>
                <View style={[styles.messageContainer, styles.userMessage]}>
                    <Text style={styles.userText}>Saya ingin bertanya tentang layanan Anda.</Text>
                </View>
                <View style={[styles.messageContainer, styles.adminMessage]}>
                    <Text style={styles.botText}>Tentu, apa yang ingin Anda ketahui?</Text>
                </View>
                <View style={[styles.messageContainer, styles.userMessage]}>
                    <Text style={styles.userText}>Apakah ada promo khusus bulan ini?</Text>
                </View>
                <View style={[styles.messageContainer, styles.adminMessage]}>
                    <Text style={styles.botText}>Tentu, apa yang ingin Anda ketahui?</Text>
                </View>
                <View style={[styles.messageContainer, styles.userMessage]}>
                    <Text style={styles.userText}>Apakah ada promo khusus bulan ini?</Text>
                </View>
                <View style={[styles.messageContainer, styles.adminMessage]}>
                    <Text style={styles.botText}>Tentu, apa yang ingin Anda ketahui?</Text>
                </View>
                <View style={[styles.messageContainer, styles.userMessage]}>
                    <Text style={styles.userText}>Apakah ada promo khusus bulan ini?</Text>
                </View>
                <View style={[styles.messageContainer, styles.adminMessage]}>
                    <Text style={styles.botText}>Tentu, apa yang ingin Anda ketahui?</Text>
                </View>
                <View style={[styles.messageContainer, styles.userMessage]}>
                    <Text style={styles.userText}>Apakah ada promo khusus bulan ini?</Text>
                </View>
            </ScrollView>

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.attachButton}>
                    <Ionicons name="attach" size={24} color="gray" />
                </TouchableOpacity>

                <TextInput
                    style={styles.inputText}
                    placeholder="Ketik pesan..."
                    placeholderTextColor="#888"
                />

                <TouchableOpacity style={styles.sendButton}>
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
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
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    chatContainer: {
        padding: 10,
        paddingBottom: 70,
    },
    messageContainer: {
        maxWidth: '75%',
        marginVertical: 5,
        padding: 12,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#54c42e',
    },
    adminMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ddd',
    },
    userText: {
        color: 'white',
        fontSize: 16,
    },
    botText: {
        color: 'black',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    attachButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    inputText: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 10,
        borderRadius: 30,
        height: 40,
        marginRight: 10,
        fontSize: 16,
        color: 'gray',
    },
    sendButton: {
        backgroundColor: '#54c42e',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
