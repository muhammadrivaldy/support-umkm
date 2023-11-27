/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Icon,
} from '@ui-kitten/components';

export const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const FacebookIcon = props => <Icon name="facebook" {...props} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={navigateDetails} accessoryLeft={FacebookIcon}>
          OPEN DETAILS
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
