import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {

    const [isFocused, setFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleInputBlur() {
        setFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!!value);
        setName(value);
    }


    async function handleSubmit() {
        if(!name) 
        return Alert.alert('Me diz como chamar você 🙁');
         
        try {
        await  AsyncStorage.setItem('@plantmanager:user', name);
        navigation.navigate('Confirmation', {
            title: 'Prontinho',
            subtitle: ' Estamos de "Plantão" por você! \n Agora vamos começar a cuidar das suas plantinhas com muito cuidado. 💚',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'PlantSelect'
        });
        }
        catch{
        Alert.alert('Não foi possível salvar o seu nome. 😢');   
        }

    }

    return (

        <View style={styles.container}>
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS == 'android' ? 'padding' : 'height'}
            >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.content}>
                <View style={styles.form}>

                    <View style={styles.header}>
                    <Text style={styles.emoji}>
                        {isFilled ? '😃' : '😄'}
                    </Text>

                    <Text style={styles.title}>
                        Como podemos {'\n'}
                        chamar você?
                    </Text>
                    </View> 

                    <TextInput 
                    style={[
                        styles.input,
                        (isFocused || isFilled) &&{borderColor: colors.green}
                    ]}
                    placeholder="Digite um nome"
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChangeText={handleInputChange}
                    />

                    <View style={styles.footer}>
                    <Button 
                    title="Confirmar"
                    onPress={handleSubmit}
                    />
                    </View>

                </View>
            </View>

        </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 45
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 20,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 25
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20


    }
})