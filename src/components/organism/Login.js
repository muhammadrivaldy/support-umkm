/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const index = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Layout
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
          }}>
          {textLogin()}
          <View style={{marginVertical: 10}} />
          {inputEmail()}
          <View style={{marginVertical: 10}} />
          {inputPassword()}
          <View style={{marginVertical: 10}} />
          {textForgotPassowrd()}
          <View style={{marginVertical: 20}} />
          {buttonLogin()}
          <View style={{marginVertical: 10}} />
          {textNotRegistered()}
        </Layout>
      </SafeAreaView>
    );
  };

  const iconPassword = props => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSecureTextEntry(!secureTextEntry);
      }}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const textLogin = () => {
    return (
      <Text style={{flexDirection: 'row', alignItems: 'center'}} category="h2">
        Login
      </Text>
    );
  };

  const textForgotPassowrd = () => {
    return (
      <Layout
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}>
        <Text category="p1">Lupa password? </Text>
        <Text category="p1" onPress={navigateToForgotPassword}>
          Klik disini
        </Text>
      </Layout>
    );
  };

  const textNotRegistered = () => {
    return (
      <Layout
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          borderColor: 'black',
        }}>
        <Text category="p1">Belum daftar? </Text>
        <Text category="p1" onPress={navigateToRegistration}>
          Daftar dulu
        </Text>
      </Layout>
    );
  };

  const inputEmail = () => {
    return (
      <Input
        placeholder="Input your email"
        value={emailValue}
        onChangeText={nextValue => setEmailValue(nextValue)}
      />
    );
  };

  const inputPassword = () => {
    return (
      <Input
        value={passwordValue}
        placeholder="Place your Text"
        accessoryRight={iconPassword}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPasswordValue(nextValue)}
      />
    );
  };

  const buttonLogin = () => {
    return (
      <Button onPress={navigateToHome} style={{alignSelf: 'stretch'}}>
        Login
      </Button>
    );
  };

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const navigateToRegistration = () => {
    navigation.navigate('Registration');
  };

  return index();
};

export default LoginScreen;
