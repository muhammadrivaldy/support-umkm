/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';

export function FormServiceName(props) {
  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
      <Input
        style={{flex: 1}}
        label={TextProps => {
          TextProps.style[0].fontWeight = '600';
          return (
            <Text category="s1" {...TextProps}>
              Nama Jasa
            </Text>
          );
        }}
      />

      <Layout style={{marginHorizontal: 4}} />

      <Button
        size="small"
        style={{alignSelf: 'flex-end', minHeight: 40}}
        accessoryLeft={props => <Icon {...props} name="edit-outline" />}
      />
    </Layout>
  );
}
