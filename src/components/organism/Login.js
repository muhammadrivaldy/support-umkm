/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {LoginAPI} from '../../stores/services';

export function LoginScreen({navigation}) {
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
        <Text category="h1">Selamat Datang</Text>
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

  const buttonLogin = props => {
    return (
      <Layout style={{flexDirection: 'row'}}>
        <Button
          onPress={() => {
            Toast.show({
              type: 'info',
              text1: 'Maaf, feature ini belum siap 🙏🏼',
              text2: 'Semoga feature ini bisa selesai tepat waktu ya',
              position: 'bottom',
            });
          }}
          accessoryLeft={iconGoogle}
          style={{flex: 1}}
        />
        <View style={{marginHorizontal: 5}} />
        <Button
          onPress={loginProcess}
          accessoryLeft={iconLogin}
          style={{flex: 1}}>
          {TextProps => {
            TextProps.style.fontFamily = 'Raleway-Bold';
            TextProps.style.fontWeight = '600';
            TextProps.style.marginTop = -3;
            return <Text {...TextProps}>Login</Text>;
          }}
        </Button>
      </Layout>
    );
  };

  const loginProcess = () => {
    const doFunc = async () => {
      var result = await LoginAPI(emailValue, passwordValue);
      if (result.code === 200) {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
        Toast.show({
          type: 'info',
          text1: 'Berhasil masuk',
          text2: 'Selamat menikmati aplikasi kami 😄',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Terjadi kesalahan',
          text2: result.message,
          position: 'bottom',
        });
      }
    };

    doFunc();
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const navigateToRegistration = () => {
    navigation.navigate('RegistrationScreen');
  };

  return index();
}
