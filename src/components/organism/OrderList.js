/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  Text,
} from '@ui-kitten/components';
import {Dimensions, View} from 'react-native';

const data = [
  {
    name: 'Muhammad Rivaldy',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'August Dila Ardhelisa',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'Muhammad Rivaldy',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'August Dila Ardhelisa',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'Muhammad Rivaldy',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'August Dila Ardhelisa',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
];

const StarIcon = props => <Icon {...props} name="phone-call-outline" />;

export function OrderListScreen({navigation}) {
  return (
    <List
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      data={data}
      contentContainerStyle={{paddingHorizontal: 8, paddingVertical: 4}}
      renderItem={info => (
        <Card style={{marginVertical: 4}}>
          <Layout
            style={{
              flexDirection: 'row',
              alignContent: 'space-around',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="s1">{info.item.name}</Text>
              <Text category="p2">{info.item.phone}</Text>
            </Layout>

            <Button
              status="info"
              accessoryLeft={StarIcon}
              style={{maxHeight: 40, maxWidth: 40}}
            />
          </Layout>

          <View style={{marginVertical: 4}} />
          <Divider />
          <View style={{marginVertical: 4}} />

          <Layout
            style={{
              flexDirection: 'row',
              alignContent: 'space-around',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="p2">
                Status: <Text category="s2">{info.item.status}</Text>{' '}
              </Text>
              <Text category="p2">
                Pembayaran: <Text category="s2">{info.item.payment}</Text>{' '}
              </Text>
              <Text category="p2">
                Tenggat Waktu: <Text category="s2">{info.item.deadline}</Text>{' '}
              </Text>
              <Text category="p2">
                Dibuat: <Text category="s2">{info.item.createdAt}</Text>{' '}
              </Text>
            </Layout>

            <Layout style={{backgroundColor: 'transparent'}}>
              <Button status="primary" size="tiny" disabled={true}>
                Lunas
              </Button>
              <View style={{marginVertical: 4}} />
              <Button status="primary" size="tiny">
                Selesai
              </Button>
              <View style={{marginVertical: 4}} />
              <Button status="danger" size="tiny">
                Cancel
              </Button>
            </Layout>
          </Layout>
        </Card>
      )}
    />
  );
}
