import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'


const ButtonLinearGradient = ({ title, ...rest }) => {
    return (
        <TouchableOpacity {...rest}>
            {rest.name === 'started' &&
                <LinearGradient
                    style={styles.started}
                    colors={[colors.default, '#be03fd']}>
                    <Text style={styles.textStarted}>{title}</Text>
                </LinearGradient>}

                {rest.name === 'submit' &&
                <LinearGradient
                    style={styles.submit}
                    colors={[colors.default, '#be03fd']}>
                    <Text style={[styles.textSubmit, {color:'#fff'}]}>{title}</Text>
                </LinearGradient>}

        </TouchableOpacity>
    )
}

export default ButtonLinearGradient

const styles = StyleSheet.create({
    started: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textStarted: {
        color: 'white',
        fontWeight: 'bold'
    },
    submit: {
        width: 250,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSubmit: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

