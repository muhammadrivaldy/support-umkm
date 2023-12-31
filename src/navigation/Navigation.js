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
import {CreateOrderScreen} from '../components/organism/CreateOrder';
import {CreateCustomerScreen} from '../components/organism/CreateCustomer';
import {CreateOrder_CustomerListScreen} from '../components/organism/CreateOrder_CustomerList';
import {CreateOrder_AddingServiceScreen} from '../components/organism/CreateOrder_AddingService';
import {CreateOrder_PaymentScreen} from '../components/organism/CreateOrder_Payment';
import {DetailOrderScreen} from '../components/organism/detailOrder/Index';
import {ManageServicesScreen} from '../components/organism/manageServices/Index';
import {ManagePackagesScreen} from '../components/organism/managePackages/Index';

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
      <Stack.Screen name="CreateOrderScreen" component={CreateOrderScreen} />
      <Stack.Screen
        name="CreateOrder_AddingServiceScreen"
        component={CreateOrder_AddingServiceScreen}
      />
      <Stack.Screen
        name="CreateOrder_CustomerListScreen"
        component={CreateOrder_CustomerListScreen}
      />
      <Stack.Screen
        name="CreateOrder_PaymentScreen"
        component={CreateOrder_PaymentScreen}
      />
      <Stack.Screen
        name="CreateCustomerScreen"
        component={CreateCustomerScreen}
      />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="MapsScreen" component={MapsScreen} />
      <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
      <Stack.Screen name="CustomerListScreen" component={CustomerListScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HomeScreen" component={HomeNavigator} />
      <Stack.Screen name="DetailOrderScreen" component={DetailOrderScreen} />
      <Stack.Screen
        name="ManageServicesScreen"
        component={ManageServicesScreen}
      />
      <Stack.Screen
        name="ManagePackagesScreen"
        component={ManagePackagesScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
