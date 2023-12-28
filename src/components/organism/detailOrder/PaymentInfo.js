/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Layout, Text} from '@ui-kitten/components';

export function PaymentInfo(props) {
  let {totalPayment, paidPayment, statusPayment, paymentMethod} = props;

  return (
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
  );
}
