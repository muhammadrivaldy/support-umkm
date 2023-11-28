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

const IconMap = props => <Icon {...props} name="compass-outline" />;

const IconPerson = props => <Icon {...props} name="person-outline" />;

const HomeNavigator = () => (
  <Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <HomeBottomNavigation {...props} />}>
    <Screen name="Maps" component={HomeScreen} />
    <Screen name="Users" component={DetailsScreen} />
  </Navigator>
);

const HomeBottomNavigation = ({navigation, state}) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={IconMap} title="Maps" />
      <BottomNavigationTab icon={IconPerson} title="Users" />
    </BottomNavigation>
  );
};

export default HomeNavigator;
