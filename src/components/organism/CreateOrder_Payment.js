/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  Modal,
  Radio,
  RadioGroup,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {PostOrdersAPI} from '../../stores/Services';
import {GetToken} from '../../stores/Storages';
import Toast from 'react-native-toast-message';

const paymentMethods = ['cash', 'transfer'];

function BackIcon(props) {
  <Icon {...props} name="arrow-back" />;
}

function BackAction(navigation) {
  return () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
}

export function CreateOrder_PaymentScreen({navigation, route}) {
  const {customer, totalItems, totalPayment, packages} = route.params;
  const [selectedPayment, setSelectedPayment] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [paidPayment, setPaidPayment] = React.useState(null);

  return (
    <Layout style={{flex: 1}}>
      <TopNavigation
        accessoryLeft={BackAction(navigation)}
        title="Bayar"
        navigation={navigation}
      />

      <Modal
        visible={visible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
        onBackdropPress={() => navigation.navigate('HomeScreen')}>
        <Card disabled={true}>
          <Text style={{textAlign: 'center'}}>
            Order berhasil dibuat ya, silahkan kembali kemenu utama
          </Text>
          <Layout style={{marginVertical: 6}} />
          <Button onPress={() => navigation.navigate('HomeScreen')}>
            {TextProps => {
              TextProps.style.fontFamily = 'Raleway-Bold';
              TextProps.style.fontWeight = '600';
              return <Text {...TextProps}>Menu Utama</Text>;
            }}
          </Button>
        </Card>
      </Modal>

      <Divider />

      <Layout
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}>
        <Card status="primary" disabled={true}>
          <Layout
            style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="p2">Nama</Text>
              <Text category="s1">{customer.name}</Text>

              <Layout style={{marginVertical: 6}} />

              <Text category="p2">No Hp</Text>
              <Text category="s1">{customer.phoneNumber}</Text>
            </Layout>

            <Layout style={{marginHorizontal: 10}} />

            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="p2">Address</Text>
              <Text category="s1">{customer.address}</Text>
            </Layout>
          </Layout>
        </Card>

        <Layout style={{marginVertical: 10}} />

        <Layout style={{paddingHorizontal: 25}}>
          <Text category="p2">Total Jasa</Text>
          <Text category="s1">{totalItems} item</Text>

          <Layout style={{marginVertical: 6}} />

          <Text category="p2">Total yang harus dibayar</Text>
          <Text category="s1">Rp. {totalPayment}</Text>

          <Layout style={{marginVertical: 6}} />

          <Text category="p2">Pembayaran melalui</Text>
          <RadioGroup
            style={{flexDirection: 'row'}}
            selectedIndex={selectedPayment}
            onChange={index => setSelectedPayment(index)}>
            <Radio>Cash</Radio>
            <Radio>Transfer</Radio>
          </RadioGroup>

          <Layout style={{marginVertical: 6}} />

          <Divider />

          <Layout style={{marginVertical: 10}} />

          <Input
            inputMode="numeric"
            placeholder="Input nominal yang ingin dibayarkan"
            onChangeText={text => setPaidPayment(text)}
            label={TextProps => {
              TextProps.style[0].color = '#8F9BB3';
              TextProps.style[0].fontWeight = '600';
              return (
                <Text category="s1" {...TextProps}>
                  Nominal pembayaran
                </Text>
              );
            }}
            accessoryLeft={() => {
              return (
                <Layout
                  style={{
                    borderWidth: 0,
                    marginLeft: 10,
                    backgroundColor: 'transparent',
                  }}>
                  <Text category="s2" style={{textAlign: 'center'}}>
                    Rp
                  </Text>
                </Layout>
              );
            }}
          />
        </Layout>
      </Layout>

      <Button
        style={{
          marginHorizontal: 8,
          marginBottom: 8,
        }}
        onPress={() => {
          if (paidPayment === null) {
            return Toast.show({
              type: 'error',
              text1: 'Lengkapi dulu dong 😡',
              text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
              text2: 'Tolong nominal pembayaran yang diinginkan',
              text2Style: {fontFamily: 'Raleway-Regular'},
              position: 'bottom',
            });
          }

          GetToken().then(async token => {
            await PostOrdersAPI(
              token,
              customer.id,
              totalPayment,
              Number(paidPayment),
              paymentMethods[selectedPayment],
              packages,
            ).then(response => {
              if (response.code === 201) {
                setVisible(true);
              } else {
                Toast.show({
                  type: 'error',
                  position: 'bottom',
                  text1: 'Maaf, terjadi kesalahan 😭',
                  text1Style: {
                    fontFamily: 'Raleway-Bold',
                    fontWeight: '600',
                  },
                  text2: 'Silahkan hubungi kami untuk menanyakan masalah anda',
                  text2Style: {fontFamily: 'Raleway-Regular'},
                });
              }
            });
          });
        }}>
        {TextProps => {
          TextProps.style.fontFamily = 'Raleway-Bold';
          TextProps.style.fontWeight = '600';
          return <Text {...TextProps}>Klik Disini Untuk Membuat Order</Text>;
        }}
      </Button>
    </Layout>
  );
}
