/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';
import {TextH1} from '../atoms/Text';

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
          <View style={{marginVertical: 5}} />
          {textForgotPassword()}
          <View style={{marginVertical: 20}} />
          {buttonLogin()}
          <View style={{marginVertical: 5}} />
          {textNotRegistered()}
        </Layout>
      </SafeAreaView>
    );
  };

  const iconPassword = props => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setSecureTextEntry(!secureTextEntry);
        }}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableWithoutFeedback>
    );
  };

  const iconGoogle = props => {
    return <Icon {...props} name="google" />;
  };

  const iconLogin = props => {
    return <Icon {...props} name="arrow-circle-right" />;
  };

  const textLogin = () => {
    return (
      <Layout style={{alignItems: 'center'}}>
        <TextH1 text="Selamat Datang" />
        <Text category="s1">Silahkan masukkan email & password kamu</Text>
      </Layout>
    );
  };

  const textForgotPassword = () => {
    return (
      <Layout
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}>
        <Text category="p1">Lupa password? </Text>
        <Text category="s1" onPress={navigateToForgotPassword} status="info">
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
        <Text category="p1">Belum punya akun? </Text>
        <Text category="s1" onPress={navigateToRegistration} status="info">
          Daftar dulu dong
        </Text>
      </Layout>
    );
  };

  const inputEmail = () => {
    return (
      <Input
        placeholder="Email kamu"
        value={emailValue}
        onChangeText={nextValue => setEmailValue(nextValue)}
      />
    );
  };

  const inputPassword = () => {
    return (
      <Input
        value={passwordValue}
        placeholder="Masukkan password kamu disini"
        accessoryRight={iconPassword}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPasswordValue(nextValue)}
      />
    );
  };

  const buttonLogin = () => {
    return (
      <Layout style={{flexDirection: 'row'}}>
        <Button
          onPress={navigateToHome}
          accessoryLeft={iconGoogle}
          style={{flex: 1}}
        />
        <View style={{marginHorizontal: 5}} />
        <Button
          onPress={navigateToHome}
          accessoryLeft={iconLogin}
          style={{flex: 1}}>
          Login
        </Button>
      </Layout>
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
