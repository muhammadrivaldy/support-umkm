/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/organism/Home';
import DetailsScreen from '../components/organism/Details';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const {Navigator, Screen} = createBottomTabNavigator();

const PersonIcon = props => <Icon {...props} name="person-outline" />;

const BellIcon = props => <Icon {...props} name="bell-outline" />;

const HomeNavigator = () => (
  <Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <HomeBottomNavigation {...props} />}>
    <Screen name="Users" component={HomeScreen} />
    <Screen name="Orders" component={DetailsScreen} />
  </Navigator>
);

const HomeBottomNavigation = ({navigation, state}) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={PersonIcon} title="Users" />
      <BottomNavigationTab icon={BellIcon} title="Orders" />
    </BottomNavigation>
  );
};

export default HomeNavigator;
