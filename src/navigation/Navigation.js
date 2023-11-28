import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../components/organism/Login';
import HomeNavigator from './Home';
import ForgotPassword from '../components/organism/ForgotPassword';
import Registration from '../components/organism/Registration';

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Home" component={HomeNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
