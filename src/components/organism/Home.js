/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Layout, Icon, Text} from '@ui-kitten/components';

const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Users');
  };

  const iconPerson = props => <Icon name="person-outline" {...props} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={navigateDetails} accessoryLeft={iconPerson}>
          {evaProps => {
            evaProps.style.fontFamily = 'Raleway-Bold';
            evaProps.style.fontWeight = '600';
            evaProps.style.marginTop = -2;
            return <Text {...evaProps}>Open Users</Text>;
          }}
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;
