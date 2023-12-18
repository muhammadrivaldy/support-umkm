import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';

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

export function CreateCustomerScreen({navigation}) {
  return (
    <TopNavigation
      accessoryLeft={BackAction(navigation)}
      title="Tambah Pelanggan"
      navigation={navigation}
    />
  );
}
