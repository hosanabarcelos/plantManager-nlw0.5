import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Button} from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'grateful',
    nextScreen: string;
}

const emojis = {
    grateful: '🥰 ',
    smile: '😁 '
}

export function Confirmation() {

    const navigation = useNavigation();
    const routes = useRoute();

    const{
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleMoveOn() {
        navigation.navigate(nextScreen)
    }

    return(
        <View style={styles.container}>
            <View style = {styles.content}>
                <Text style = {styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.subtitle}>
                    {subtitle}
                </Text>

                <View style = {styles.footer}>
                     <Button
                     title={buttonTitle}
                     onPress={handleMoveOn}
                     />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    emoji: {
        fontSize: 75
    },
    title: {
        fontSize: 24,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
        fontFamily: fonts.text
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
})