import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sendMessage, fetchMessages } from '../../services/chatService';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { getData } from '../../services/storageService';

export default function Chat() {
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [userId, setUserId] = useState(null);

    const scrollViewRef = useRef();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const user = await getData('user');
                if (user && user.id) {
                    setUserId(user.id);
                    console.log('User ID:', user.id);
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchChatMessages = async () => {
            try {
                const response = await fetchMessages({ sender_id: userId });
                console.log('response fetch: ', response.status);
                if (response.status) {
                    const updatedMessages = response.data.map(msg => ({
                        ...msg,
                        senderId: msg.sender_id || userId,
                    }));
                    setMessages(updatedMessages);
                } else {
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Gagal Mengambil Pesan',
                        textBody: response.message,
                        button: 'close',
                    });
                }
            } catch (error) {
                console.log('Error fetching messages:', error.message);
                Dialog.show({
                    type: ALERT_TYPE.ERROR,
                    title: 'Error',
                    textBody: 'Terjadi kesalahan saat mengambil pesan.',
                    button: 'close',
                });
            }
        };

        fetchChatMessages(); // Fetch pertama kali

        const interval = setInterval(fetchChatMessages, 1000); // Fetch setiap 3 detik

        return () => clearInterval(interval); // Cleanup interval saat komponen unmount
    }, [userId]);


    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!message || message.trim() === '') return;

        try {
            const newUserMessage = { senderId: userId, message: message };
            console.log('newUserMessage: ', newUserMessage);
            setMessages((prevMessages) => [...prevMessages, newUserMessage]);
            const response = await sendMessage({ message, receiver_id: 1 });

            if (response.status) {
                const newAdminMessage = { senderId: 1, message: response.data.reply };
                setMessages((prevMessages) => [...prevMessages, newAdminMessage]);
                setMessage('');
            } else {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Gagal Pesan',
                    textBody: response.message,
                    button: 'close',
                });
            }
        } catch (error) {
            console.log('Error sending message: ', error.message);
            Dialog.show({
                type: ALERT_TYPE.ERROR,
                title: 'Error',
                textBody: 'Terjadi kesalahan saat mengirim pesan.',
                button: 'close',
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Heart App</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.chatContainer}
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
            >
                {messages.map((msg, index) => (
                    msg.message && msg.message.trim() !== '' && (
                        <View
                            key={index}
                            style={[
                                styles.messageContainer,
                                msg.senderId === userId ? styles.userMessage : styles.adminMessage,
                            ]}
                        >
                            <Text style={msg.senderId === userId ? styles.userText : styles.botText}>
                                {msg.message}
                            </Text>
                        </View>
                    )
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Ketik pesan..."
                    value={message}
                    onChangeText={setMessage}
                    placeholderTextColor="#888"
                />

                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        alignSelf: 'flex-end', // Align user's messages to the right
        backgroundColor: '#54c42e',
    },
    adminMessage: {
        alignSelf: 'flex-start', // Align admin's messages to the left
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