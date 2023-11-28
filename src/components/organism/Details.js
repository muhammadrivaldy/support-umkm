/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Icon, Layout} from '@ui-kitten/components';

const DetailsScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Login');
  };

  const LogoutIcon = props => (
    <Icon name="corner-down-left-outline" {...props} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={navigateDetails} accessoryLeft={LogoutIcon}>
          Back to Login
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default DetailsScreen;
