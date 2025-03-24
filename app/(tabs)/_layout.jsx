import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { storeData, getData, removeData } from '../../services/storageService';

export default function TabLayout() {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            const isLogin = await getData('isLogin');
            if (!isLogin) {
                return router.push('/login');
            }
        }
        checkLogin();
    })
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='index'
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: (color) => <FontAwesome name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='Test'
                options={{
                    tabBarLabel: 'Test',
                    tabBarIcon: (color) => <FontAwesome name="heartbeat" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='Antrian'
                options={{
                    tabBarLabel: 'Antrian',
                    tabBarIcon: (color) => <MaterialCommunityIcons name="human-queue" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='History'
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: (color) => <MaterialCommunityIcons name="history" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='Profile'
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: (color) => <MaterialCommunityIcons name="account" size={24} color={color} />
                }}
            />
            
        </Tabs>
    )
}