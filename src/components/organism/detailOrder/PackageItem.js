/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import {GenerateRemainingTime} from '../../../utils/Transform';
import {GenerateTimestampToDateTime} from '../../../utils/Time';

export function PackageItem(props) {
  let {item, idx} = props;

  return (
    <Layout style={{flexDirection: 'row', marginLeft: 25}} key={idx}>
      <Layout style={{justifyContent: 'flex-start', paddingTop: 13}}>
        <Text category="c2">Jasa Ke-{idx + 1}</Text>
      </Layout>
      <ListItem
        title={item.service_name}
        disabled={true}
        style={{flex: 1, backgroundColor: 'transparent'}}
        description={TextProps => {
          return (
            <Layout style={{flex: 1}}>
              <Text category="s1" {...TextProps}>
                Estimasi selesai{' '}
                {GenerateTimestampToDateTime(item.estimated_at)}
              </Text>
              <Text category="s1" {...TextProps}>
                Tenggat waktu{' '}
                {GenerateRemainingTime(item.remaining_time_details)}
              </Text>
              <Text category="s1" {...TextProps}>
                Total harga Rp. {item.total_price}
              </Text>

              <Layout style={{marginVertical: 4}} />

              <Text category="s1" {...TextProps}>
                Catatan: {item.note}
              </Text>
            </Layout>
          );
        }}
      />
    </Layout>
  );
}
