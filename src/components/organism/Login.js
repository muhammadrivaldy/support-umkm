/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import {SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  GetOrderPaymentStatusesAPI,
  GetOrderStatusesAPI,
  LoginAPI,
  RefreshTokenAPI,
} from '../../stores/Services';
import {
  GetRefreshToken,
  StoreRefreshToken,
  StoreToken,
} from '../../stores/Storages';
import {GroupedData, MapPaymentStatus, MapStatus} from './OrderList';

export function LoginScreen({navigation}) {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  useEffect(() => {
    init().then(response => {
      if (response !== null) {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      }
    });
  });

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
              text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
              text2: 'Semoga feature ini bisa selesai tepat waktu ya',
              text2Style: {fontFamily: 'Raleway-Regular'},
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
        await initStatuses(result.data.token);

        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });

        Toast.show({
          text1: 'Berhasil masuk',
          text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
          text2: 'Selamat menggunakan aplikasi kami 😄',
          text2Style: {fontFamily: 'Raleway-Regular'},
          position: 'bottom',
        });

        StoreToken(result.data.token);
        StoreRefreshToken(result.data.refresh_token);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Maaf, terjadi kesalahan 😭',
          text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
          text2: 'Silahkan hubungi kami untuk menanyakan masalah anda',
          text2Style: {fontFamily: 'Raleway-Regular'},
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

  const init = async () => {
    var token = null;

    await initAuth().then(async response => {
      if (response !== null) {
        await initStatuses(response);
        token = response;
      }
    });

    return token;
  };

  const initStatuses = async token => {
    await GetOrderStatusesAPI(token).then(response => {
      response.data.map(idx => {
        GroupedData.Pembayaran.push(idx.name);
        MapStatus[idx.name] = idx.id;
      });
    });

    await GetOrderPaymentStatusesAPI(token).then(response => {
      response.data.map(idx => {
        GroupedData.Status.push(idx.name);
        MapPaymentStatus[idx.name] = idx.id;
      });
    });
  };

  const initAuth = async () => {
    var token = null;

    await GetRefreshToken().then(async refreshToken => {
      if (refreshToken !== null) {
        await RefreshTokenAPI(refreshToken).then(response => {
          StoreToken(response.data.token);
          StoreRefreshToken(response.data.refresh_token);
          token = response.data.token;
        });
      }
    });

    return token;
  };

  return index();
}
