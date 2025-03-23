import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={style.container}>
            <View style={style.header}>
                <Image source={require('../../assets/images/ilustrasi/char.png')} style={style.imageIlustration} />
            </View>
            <View style={style.schedule}>
                
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})
