/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import * as React from 'react'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import { 
  NavigationContainer
} from '@react-navigation/native';

import { Provider } from 'react-redux'
import { RootStack } from './routes';
import { store } from './redux';



const App = () => {
  return (
    // <View>
    //   {/* <Image source={{uri : ''}} /> */}
    //   <Text>Hello World!!</Text>
    // </View>
    <Provider store={store}>
      <NavigationContainer>
        <RootStack/>
      </NavigationContainer>
    </Provider>
  )
};

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default App;
