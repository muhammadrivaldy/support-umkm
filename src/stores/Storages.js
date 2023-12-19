import AsyncStorage from '@react-native-async-storage/async-storage';

export function StoreToken(token) {
  const doFunc = async () => {
    await AsyncStorage.setItem('token', token);
  };

  doFunc();
}

export function GetToken() {
  const doFunc = async () => {
    var token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    }

    return null;
  };

  return doFunc();
}
