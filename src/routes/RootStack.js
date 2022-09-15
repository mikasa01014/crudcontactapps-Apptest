import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import {Welcome, Splash,Home} from '../pages';
import { colors } from '../constant';
import { Button } from '../component';

const Stack = createStackNavigator();

const RootStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options = {{ headerShown: false}} />
        </Stack.Navigator>
    )
}

export default RootStack;