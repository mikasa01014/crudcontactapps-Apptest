import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,StatusBar, ImageBackground, Image} from 'react-native'
import {SplashBackground} from '../../assets'
import {colors} from '../../constant'

const Splash = ({navigation}) => {
    
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Welcome')
        },3000)
    }, [navigation]);

    const Footer = () => {
        return (
            <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.textSign, {
                    color: 'red'
                }]}>Created By Rizky Aditya Maulana</Text>

            </View>
        )
    }

    return (
        <ImageBackground source={SplashBackground} style={styles.background}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.textSign}>
                <Text>CRUD Contact App</Text>
            </View>

            <Footer />
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.default,
        fontWeight: 'bold'
    },
    textContainer: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

  export default Splash;
  