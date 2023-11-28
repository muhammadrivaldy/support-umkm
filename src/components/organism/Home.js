/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Layout, Icon} from '@ui-kitten/components';

const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Orders');
  };

  const iconFacebook = props => <Icon name="facebook" {...props} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={navigateDetails} accessoryLeft={iconFacebook}>
          Open Details
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;