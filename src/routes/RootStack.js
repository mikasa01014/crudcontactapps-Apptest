import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {Welcome, Splash,Home} from '../pages';
import { colors } from '../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
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