/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';

export function CustomerInfo(props) {
  let customer = props.params;

  return (
    <Card status="primary" disabled={true}>
      <Layout style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
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
  );
}
