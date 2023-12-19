import AsyncStorage from '@react-native-async-storage/async-storage';

// Documentation:
// https://react-native-async-storage.github.io/async-storage/docs/install/

export function StoreToken(token) {
  const doFunc = async () => {
    await AsyncStorage.setItem('token', token);
  };

  doFunc();
}

export function StoreRefreshToken(token) {
  const doFunc = async () => {
    await AsyncStorage.setItem('refresh-token', token);
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

export function GetRefreshToken() {
  const doFunc = async () => {
    var token = await AsyncStorage.getItem('refresh-token');
    if (token !== null) {
      return token;
    }

    return null;
  };

  return doFunc();
}

export function RemoveToken() {
  const doFunc = async () => {
    await AsyncStorage.removeItem('token');
  };

  return doFunc();
}

export function RemoveRefreshToken() {
  const doFunc = async () => {
    await AsyncStorage.removeItem('refresh-token');
  };

  return doFunc();
}
