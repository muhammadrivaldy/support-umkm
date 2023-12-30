/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Divider, Layout} from '@ui-kitten/components';
import {ScrollView} from 'react-native';
import {Header} from './Header';
import {CustomerInfo} from './CustomerInfo';
import {PaymentInfo} from './PaymentInfo';
import {ServiceInfo} from './ServiceInfo';

export function DetailOrderScreen(props) {
  const {
    customer,
    totalItems,
    totalPayment,
    paidPayment,
    statusPayment,
    statusOrder,
    paymentMethod,
    items,
  } = props.route.params;

  const paramsForPaymentInfo = {
    totalPayment: totalPayment,
    paidPayment: paidPayment,
    statusPayment: statusPayment,
    paymentMethod: paymentMethod,
  };

  const paramsForServiceInfo = {
    statusOrder: statusOrder,
    totalItems: totalItems,
    items: items,
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {Header(props)}

      <Layout
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}>
        {CustomerInfo({params: customer})}

        <Layout style={{marginVertical: 10}} />

        <Layout style={{paddingHorizontal: 25, flex: 1}}>
          {PaymentInfo(paramsForPaymentInfo)}

          <Layout style={{marginVertical: 6}} />

          <Divider />

          <Layout style={{marginVertical: 6}} />

          {ServiceInfo(paramsForServiceInfo)}
        </Layout>
      </Layout>
    </ScrollView>
  );
}
