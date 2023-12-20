/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {PostCustomersAPI} from '../../stores/Services';
import {GetToken} from '../../stores/Storages';
import Toast from 'react-native-toast-message';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackAction = navigation => {
  return () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export function CreateCustomerScreen({navigation}) {
  const [name, setName] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [address, setAddress] = React.useState(null);

  return (
    <Layout style={{flex: 1}}>
      <TopNavigation
        accessoryLeft={BackAction(navigation)}
        title="Tambah Pelanggan"
        navigation={navigation}
      />

      <Divider />

      <Layout style={{marginVertical: 4}} />

      <Layout style={{flex: 1, paddingVertical: 4, paddingHorizontal: 8}}>
        <Layout style={{flex: 1}}>
          <Input
            placeholder="Nama pelanggan kamu"
            value={name}
            onChangeText={text => setName(text)}
            label={TextProps => {
              TextProps.style[0].fontWeight = '600';
              return <Text {...TextProps}>Nama pelanggan</Text>;
            }}
          />

          <Layout style={{marginVertical: 6}} />

          <Input
            placeholder="Nomor hp nya beliau"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            label={TextProps => {
              TextProps.style[0].fontWeight = '600';
              return <Text {...TextProps}>No HP</Text>;
            }}
          />

          <Layout style={{marginVertical: 6}} />

          <Input
            multiline={true}
            placeholder="Alamat pelanggan kamu"
            value={address}
            onChangeText={text => setAddress(text)}
            textStyle={{minHeight: 100}}
            label={TextProps => {
              TextProps.style[0].fontWeight = '600';
              return <Text {...TextProps}>Alamat</Text>;
            }}
          />

          <Layout style={{marginVertical: 6}} />

          <Button
            onPress={async () => {
              await GetToken().then(async responseToken => {
                await PostCustomersAPI(
                  responseToken,
                  name,
                  phoneNumber,
                  address,
                ).then(response => {
                  if (response.code === 201) {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'CustomerListScreen'}],
                    });

                    Toast.show({
                      position: 'bottom',
                      text1: 'Berhasil menambahkan pelanggan 👍🏼',
                      text1Style: {
                        fontFamily: 'Raleway-Bold',
                        fontWeight: '600',
                      },
                      text2:
                        "Saya doakan laundry'an nya semakin ramai Aamiin... 🤲🏼",
                      text2Style: {fontFamily: 'Raleway-Regular'},
                    });

                    setName(null);
                    setPhoneNumber(null);
                    setAddress(null);
                  } else {
                    Toast.show({
                      type: 'error',
                      position: 'bottom',
                      text1: 'Maaf, terjadi kesalahan 😭',
                      text1Style: {
                        fontFamily: 'Raleway-Bold',
                        fontWeight: '600',
                      },
                      text2:
                        'Silahkan hubungi kami untuk menanyakan masalah anda',
                      text2Style: {fontFamily: 'Raleway-Regular'},
                    });
                  }
                });
              });
            }}>
            {TextProps => {
              TextProps.style.fontFamily = 'Raleway-Bold';
              TextProps.style.fontWeight = '600';
              return <Text {...TextProps}>Submit</Text>;
            }}
          </Button>

          <Layout style={{marginVertical: 10}} />

          <Layout style={{flexDirection: 'row'}}>
            <Divider style={{flex: 1, marginRight: 10}} />
            <Text style={{marginTop: -11}} category="s2">
              Atau
            </Text>
            <Divider style={{flex: 1, marginLeft: 10}} />
          </Layout>

          <Layout style={{marginVertical: 6}} />

          <Button
            status="info"
            onPress={async () => {
              await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
              );

              await Contacts.getAllWithoutPhotos()
                .then(async response => {
                  Toast.show({
                    position: 'bottom',
                    text1: 'Berhasil melakukan import data 👍🏼',
                    text1Style: {
                      fontFamily: 'Raleway-Bold',
                      fontWeight: '600',
                    },
                    text2:
                      'Silahkan tunggu prosesnya selesai kurang lebih 5 menit',
                    text2Style: {fontFamily: 'Raleway-Regular'},
                  });

                  if (response.length > 0) {
                    response.map(async idx => {
                      let tempName = idx.displayName;
                      let tempPhoneNumber = idx.phoneNumbers[0].number;
                      let tempAddress = 'Alamat belum terdaftarkan';

                      await GetToken().then(async responseToken => {
                        await PostCustomersAPI(
                          responseToken,
                          tempName,
                          tempPhoneNumber,
                          tempAddress,
                        );
                      });
                    });
                  }
                })
                .catch(error => {
                  Toast.show({
                    type: 'error',
                    text1: 'Maaf, terjadi kesalahan 😭',
                    text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
                    text2:
                      'Silahkan hubungi kami untuk menanyakan masalah anda',
                    text2Style: {fontFamily: 'Raleway-Regular'},
                    position: 'bottom',
                  });
                });
            }}>
            {TextProps => {
              TextProps.style.fontFamily = 'Raleway-Bold';
              TextProps.style.fontWeight = '600';
              return <Text {...TextProps}>Import Semua Kontak</Text>;
            }}
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}
