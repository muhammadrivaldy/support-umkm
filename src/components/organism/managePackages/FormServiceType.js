/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Button,
  Icon,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';

export function FormServiceType(props) {
  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
      <Select
        style={{flex: 1}}
        label={TextProps => {
          TextProps.style[1].fontWeight = '600';
          return (
            <Text category="s1" {...TextProps}>
              Tipe Jasa
            </Text>
          );
        }}
        placeholder={'Pilih type jasa'}>
        <SelectItem title={'testing'} />
      </Select>

      <Layout style={{marginHorizontal: 4}} />

      <Button
        size="small"
        style={{alignSelf: 'flex-end', minHeight: 40}}
        accessoryLeft={props => <Icon {...props} name="edit-outline" />}
      />
    </Layout>
  );
}
