/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';
import {PackageItem} from './PackageItem';

export function ServiceInfo(props) {
  let {statusOrder, totalItems, items} = props;

  return (
    <>
      <Card status="info" disabled={true}>
        <Text category="p2">Status order</Text>
        <Text category="s1">{statusOrder}</Text>

        <Layout style={{marginVertical: 6}} />

        <Text category="p2">Total Jasa</Text>
        <Text category="s1">{totalItems} item</Text>
      </Card>

      <Layout style={{marginVertical: 6}} />

      {items.map((item, idx) => {
        return PackageItem({item, idx});
      })}
    </>
  );
}
