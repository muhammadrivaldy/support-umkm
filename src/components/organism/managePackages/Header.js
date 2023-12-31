/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Button,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

export function Header({navigation}) {
  return (
    <>
      <TopNavigation
        accessoryRight={() => {
          <Button>Tambah Paket</Button>;
        }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={props => <Icon {...props} name="arrow-back" />}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
        title="Ubah Jasa & Paket"
        navigation={navigation}
      />

      <Divider />
    </>
  );
}
