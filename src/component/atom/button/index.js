import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../../../constant';
import ButtonLinearGradient from './LinearGradientButton';

const Button = ({ title, onPress, type, name, style }) => {
    if(type === 'linear')
    {
        return <ButtonLinearGradient name={name} title={title} onPress={onPress} />
    }

    return (
        <View>
            <TouchableOpacity
                style={[styles.signIn, {
                    borderColor: colors.default,
                    borderWidth: 1,
                    marginTop: 15,
                }]}
                onPress={onPress}
            >
                <Text style={[styles.textSign, {
                    color: colors.default
                }]}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Button

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: colors.default,
        borderRadius: 15,
        paddingVertical: 12,
    },
    loginText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    signIn: {
        width: 400,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
