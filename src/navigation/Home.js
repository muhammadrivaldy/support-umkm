/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MapsScreen} from '../components/organism/Maps';
import {MessageScreen} from '../components/organism/Message';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const {Navigator, Screen} = createBottomTabNavigator();

export function HomeNavigator() {
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <HomeBottomNavigation {...props} />}>
      <Screen name="MapsScreen" component={MapsScreen} />
      <Screen name="MessageScreen" component={MessageScreen} />
    </Navigator>
  );
}

function HomeBottomNavigation({navigation, state}) {
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
}
