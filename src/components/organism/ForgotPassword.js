/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

const ForgotPassword = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
        }}>
        <Text>Forgot Password Page</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default ForgotPassword;
