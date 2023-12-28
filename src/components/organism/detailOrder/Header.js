/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';

export function Header({navigation}) {
  return (
    <TopNavigation
      accessoryLeft={() => (
        <TopNavigationAction
          icon={props => <Icon {...props} name="arrow-back" />}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      title="Detail Order"
      navigation={navigation}
    />
  );
}
