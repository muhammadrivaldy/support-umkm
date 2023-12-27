/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  Card,
  Divider,
  Icon,
  Layout,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native';
import {UUID} from 'uuidjs';

export function DetailOrderScreen({navigation, route}) {
  const {
    customer,
    totalItems,
    totalPayment,
    paidPayment,
    statusPayment,
    statusOrder,
    paymentMethod,
    items,
  } = route.params;

  const packageItems = (item, idx) => (
    <Layout style={{flexDirection: 'row', marginLeft: 25}} key={idx}>
      <Layout style={{justifyContent: 'center'}}>
        <Text category="c2">Jasa {idx + 1}</Text>
      </Layout>
      <ListItem
        title={'Cuci & Setrika'}
        disabled={true}
        style={{flex: 1, backgroundColor: 'transparent'}}
        description={TextProps => (
          <Layout style={{flex: 1}}>
            <Text category="s1" {...TextProps}>
              {'Paket 1 (Rp. 25000)'}
            </Text>
            <Text category="s1" {...TextProps}>
              Estimasi pengerjaan {'3 Hari 2 Jam'}
            </Text>
            <Text category="s1" {...TextProps}>
              Total harga Rp. {'25000'}
            </Text>
          </Layout>
        )}
      />
    </Layout>
  );

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <TopNavigation
        accessoryLeft={() => (
          <TopNavigationAction
            icon={props => <Icon {...props} name="arrow-back" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
        title="Bayar"
        navigation={navigation}
      />

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

        <Layout style={{paddingHorizontal: 25, flex: 1}}>
          <Layout style={{flexDirection: 'row'}}>
            <Layout style={{flex: 1}}>
              <Text category="p2">Total yang harus dibayar</Text>
              <Text category="s1">Rp. {totalPayment}</Text>

              <Layout style={{marginVertical: 6}} />

              <Text category="p2">Yang sudah terbayar</Text>
              <Text category="s1">Rp. {paidPayment}</Text>
            </Layout>

            <Layout style={{flex: 1}}>
              <Text category="p2">Status bayar</Text>
              <Text category="s1">{statusPayment}</Text>

              <Layout style={{marginVertical: 6}} />

              <Text category="p2">Pembayaran melalui</Text>
              <Text category="s1">{paymentMethod}</Text>
            </Layout>
          </Layout>

          <Layout style={{marginVertical: 6}} />

          <Divider />

          <Layout style={{marginVertical: 6}} />

          <Card status="info" disabled={true}>
            <Text category="p2">Status order</Text>
            <Text category="s1">{statusOrder}</Text>

            <Layout style={{marginVertical: 6}} />

            <Text category="p2">Total Jasa</Text>
            <Text category="s1">{totalItems} item</Text>
          </Card>

          <Layout style={{marginVertical: 6}} />

          {items.map((item, idx) => {
            return packageItems(item, idx);
          })}
        </Layout>
      </Layout>
    </ScrollView>
  );
}
