import React, { useState } from 'react';
import {Alert, StyleSheet, Text, Image, View, ScrollView, Platform, TouchableOpacity} from 'react-native';
import {SvgFromUri} from 'react-native-svg';
import {useRoute} from '@react-navigation/core';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';

import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';


interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDataTime, setSelectedDataTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS  == 'ios');

    const route = useRoute();
    const {plant} = route.params as Params;

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS == 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDataTime(new Date());
            return Alert.alert('Escolha um horário futuro! ⌚')
        }

        if(dateTime)
            setSelectedDataTime(dateTime);
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave(){
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDataTime
            });

            navigation.navigate('Confirmation', {
                title: 'Certinho',
                subtitle: 'Nosso "plantão" já começou, sempre vamos lembrar você de cuidar das suas plantinhas com muito cuidado. 💚',
                buttonTitle: 'Obrigado',
                icon: 'grateful',
                nextScreen: 'MyPlants'
            });

        } catch{ 
            Alert.alert('Não foi possível salvar. 😢')
        }
    }

    return (
        <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri 
                uri = {plant.photo}
                height={150}
                width={150}
                />

                <Text style = {styles.plantName}>
                    {plant.name}
                </Text>
                <Text style = {styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>

            <View style={styles.controllers}>
                <View style={styles.tipContainer}>
                    <Image 
                    source={waterDrop}
                    style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                    {plant.water_tips}
                    </Text>
                </View>

                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                {showDatePicker && ( 
                <DateTimePicker 
                value={selectedDataTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
                />
                )}

                {
                    Platform.OS == 'android' && (
                        <TouchableOpacity
                        style={styles.dateTimePickerButton}
                        onPress={handleOpenDateTimePickerForAndroid}
                        >
                        <Text style = {styles.dateTimePickerText}>
                            {`Mudar Horário: ${format(selectedDataTime, 'HH:mm')}`}
                        </Text>
                        </TouchableOpacity>
                    )
                }
                
                <Button
                title="Cadastrar Planta"
                onPress={handleSave}
                />

            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape

    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controllers: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20, 
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }

})