import Toast from 'react-native-toast-message';

export function DefaultErrorToast() {
  Toast.show({
    type: 'error',
    text1: 'Maaf, terjadi kesalahan 😭',
    text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
    text2: 'Silahkan hubungi kami untuk menanyakan masalah anda',
    text2Style: {fontFamily: 'Raleway-Regular'},
    position: 'bottom',
  });
}
