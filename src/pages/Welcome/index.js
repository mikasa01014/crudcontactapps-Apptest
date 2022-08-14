import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions, 
    StatusBar, 
} from 'react-native'
import { IlustrasiWelcome } from '../../assets'
import { colors, colors as constantColors } from '../../constant/colors'
import * as Animatable from 'react-native-animatable'
import { Button } from '../../component'

const Welcome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor='#B474FD'
            />
            <View style = {styles.header}>
                <Animatable.Image
                    animation='bounceIn'
                    duration={1500}
                    source={IlustrasiWelcome}
                    style={styles.logo}
                    resizeMode='stretch'
                />
            </View>
            <Animatable.View
                style={styles.footer}
                animation='fadeInUpBig'
            >
                <View style={styles.logo2Content}>
                    <Text style={styles.textLogo}>CRUD Contact App</Text>
                </View>
                <Text style={styles.title}>Hello, This is a CRUD Contatct App</Text>
                <Text style={styles.text}>Click Next to Go</Text>
                <View style={styles.button}>
                    <Button type='linear'
                        title='Next'
                        name='started'
                        onPress={() => {navigation.replace("Home")}}
                        textID = "nextButton"
                    />
                </View>
            </Animatable.View>
        </View>
    )
}

export default Welcome;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantColors.default,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 15
    },
    textLogo: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.default,
        fontWeight: 'bold'
    },
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
})
