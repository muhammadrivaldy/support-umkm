import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeNavigator} from './Home';

const Navigation = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);

export default Navigation;
