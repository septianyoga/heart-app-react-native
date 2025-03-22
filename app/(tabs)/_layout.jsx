import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
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