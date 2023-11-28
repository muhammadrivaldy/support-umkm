/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/organism/Home';
import ChatScreen from '../components/organism/Message';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeNavigator = () => (
  <Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <HomeBottomNavigation {...props} />}>
    <Screen name="Maps" component={HomeScreen} />
    <Screen name="Message" component={ChatScreen} />
  </Navigator>
);

const HomeBottomNavigation = ({navigation, state}) => {
  const iconMap = props => <Icon {...props} name="compass-outline" />;
  const iconMessage = props => (
    <Icon {...props} name="message-square-outline" />
  );

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={iconMap} title="Maps" />
      <BottomNavigationTab icon={iconMessage} title="Message" />
    </BottomNavigation>
  );
};

export default HomeNavigator;
