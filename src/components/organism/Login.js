/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Layout} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }}>
          Go to homepage
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default LoginScreen;
