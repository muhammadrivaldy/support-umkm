/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';

const ChatScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Login');
  };

  const iconLogout = props => (
    <Icon name="corner-down-left-outline" {...props} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={navigateDetails} accessoryLeft={iconLogout}>
          {evaProps => {
            evaProps.style.fontFamily = 'Raleway-Bold';
            evaProps.style.fontWeight = '600';
            evaProps.style.marginTop = -2;
            return <Text {...evaProps}>Back to Login</Text>;
          }}
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default ChatScreen;
