/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';

export function ButtonPackage(props) {
  return (
    <Layout
      style={{
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        flex: 1,
        zIndex: 1,
        borderRadius: 100,
      }}>
      <Button
        style={{borderRadius: 100}}
        accessoryLeft={<Icon {...props} name="plus-outline" />}
        onPress={async () => {
          console.log('Tambah Paket');
        }}>
        {TextProps => {
          TextProps.style.fontFamily = 'Raleway-Bold';
          TextProps.style.fontWeight = '600';
          TextProps.style.marginTop = -3;
          return <Text {...TextProps}>Tambah Paket</Text>;
        }}
      </Button>
    </Layout>
  );
}
