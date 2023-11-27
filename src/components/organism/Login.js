/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello World</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default LoginScreen;
