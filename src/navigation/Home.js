/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../components/organism/Homescreen';
import {DetailsScreen} from '../components/organism/Details';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeNavigator = () => (
  <Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <BottomNavigationTabThemingShowcase {...props} />}>
    <Screen name="Users" component={HomeScreen} />
    <Screen name="Orders" component={DetailsScreen} />
    <Screen name="Transactions" component={HomeScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);

const PersonIcon = props => <Icon {...props} name="person-outline" />;

const BellIcon = props => <Icon {...props} name="bell-outline" />;

const EmailIcon = props => <Icon {...props} name="email-outline" />;

export const BottomNavigationTabThemingShowcase = ({navigation, state}) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={PersonIcon} title="Users" />
      <BottomNavigationTab icon={BellIcon} title="Orders" />
      <BottomNavigationTab icon={EmailIcon} title="Transactions" />
    </BottomNavigation>
  );
};
