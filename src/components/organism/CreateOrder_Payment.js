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
  Radio,
  RadioGroup,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

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

export function CreateOrder_PaymentScreen({navigation}) {
  const [selectedPayment, setSelectedPayment] = React.useState(0);

  return (
    <Layout style={{flex: 1}}>
      <TopNavigation
        accessoryLeft={BackAction(navigation)}
        title="Bayar"
        navigation={navigation}
      />

      <Divider />

      <Layout
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}>
        <Card status="primary">
          <Layout
            style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="p2">Nama</Text>
              <Text category="s1">Muhammad Rivaldy</Text>

              <Layout style={{marginVertical: 6}} />

              <Text category="p2">No HP</Text>
              <Text category="s1">081399839201</Text>
            </Layout>

            <Layout style={{marginHorizontal: 10}} />

            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="p2">Address</Text>
              <Text category="s1">
                Jl. Kemerdekaan selatan bagian depok no. 72
              </Text>
            </Layout>
          </Layout>
        </Card>

        <Layout style={{marginVertical: 10}} />

        <Layout style={{paddingHorizontal: 20}}>
          <Text category="p1">Total Jasa</Text>
          <Text category="h6">5 item</Text>

          <Layout style={{marginVertical: 6}} />

          <Text category="p1">Total yang harus dibayar</Text>
          <Text category="h6">Rp. 170000</Text>

          <Layout style={{marginVertical: 6}} />

          <Text category="p1">Pembayaran melalui</Text>
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
          navigation.navigate('CreateOrderScreen');
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
