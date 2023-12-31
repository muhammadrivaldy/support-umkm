/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {MapsScreen} from '../components/organism/Maps';
// import {MessageScreen} from '../components/organism/Message';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {OrderListScreen} from '../components/organism/OrderList';
import {CustomerListScreen} from '../components/organism/CustomerList';
import {ProfileScreen} from '../components/organism/Profile';
import {FinancialDashboardScreen} from '../components/organism/financialDashboard/Index';

const {Navigator, Screen} = createBottomTabNavigator();

export function HomeNavigator() {
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <HomeBottomNavigation {...props} />}>
      {/* <Screen name="MapsScreen" component={MapsScreen} /> */}
      {/* <Screen name="MessageScreen" component={MessageScreen} /> */}
      <Screen name="OrderListScreen" component={OrderListScreen} />
      <Screen name="CustomerListScreen" component={CustomerListScreen} />
      <Screen
        name="FinancialDashboardScreen"
        component={FinancialDashboardScreen}
      />
      <Screen name="ProfileScreen" component={ProfileScreen} />
    </Navigator>
  );
}

function HomeBottomNavigation({navigation, state}) {
  // const iconMap = props => <Icon {...props} name="compass-outline" />;
  // const iconMessage = props => (
  //   <Icon {...props} name="message-square-outline" />
  // );
  const iconOrderList = props => <Icon {...props} name="grid-outline" />;
  const iconCustomerList = props => <Icon {...props} name="people-outline" />;
  const iconCreditCard = props => (
    <Icon {...props} name="credit-card-outline" />
  );
  const iconProfile = props => <Icon {...props} name="person-outline" />;

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      {/* <BottomNavigationTab icon={iconMap} title="Maps" /> */}
      {/* <BottomNavigationTab icon={iconMessage} title="Message" /> */}
      <BottomNavigationTab icon={iconOrderList} title="Order" />
      <BottomNavigationTab icon={iconCustomerList} title="Pelanggan" />
      <BottomNavigationTab icon={iconCreditCard} title="Financial" />
      <BottomNavigationTab icon={iconProfile} title="Profile" />
    </BottomNavigation>
  );
}
