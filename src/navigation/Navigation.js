import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../components/organism/Login';
import {HomeNavigator} from './Home';
import {ForgotPasswordScreen} from '../components/organism/ForgotPassword';
import {RegistrationScreen} from '../components/organism/Registration';
import {ChatScreen} from '../components/organism/Chat';
import {MapsScreen} from '../components/organism/Maps';
import {OrderListScreen} from '../components/organism/OrderList';
import {CustomerListScreen} from '../components/organism/CustomerList';
import {ProfileScreen} from '../components/organism/Profile';

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="MapsScreen" component={MapsScreen} />
      <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
      <Stack.Screen name="CustomerListScreen" component={CustomerListScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HomeScreen" component={HomeNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
