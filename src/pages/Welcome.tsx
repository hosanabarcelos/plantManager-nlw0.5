import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';


import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Welcome() {


    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.slogan}>
                Gerencie {'\n'}
                suas plantas de{'\n'}
                forma fácil
            </Text>

            <Image 
            source={wateringImg} 
            style={styles.image}
            resizeMode="contain"
            />

            <Text 
            style={styles.subtitle}>
            Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={handleStart}
            >
                    <Entypo 
                    name = "chevron-thin-right"
                    style={styles.buttonIcon}
                    />
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 25

    },
    slogan: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 30
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 18,
        height: 65,
        width: 65
    },
    buttonIcon: {
        fontSize: 25,
        color: colors.white
    }
})