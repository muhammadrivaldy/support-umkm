/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';

const iconEdit = props => <Icon {...props} name="edit-outline" />;
const iconSave = props => <Icon {...props} name="save-outline" />;

export function FormServiceName(service) {
  const [save, setSave] = useState(false);

  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
      <Input
        style={{flex: 1}}
        disabled={!save}
        placeholder="Nama jasa kamu"
        value={service === null ? 'Testing' : service.service_name}
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
        status={save ? 'info' : 'primary'}
        style={{alignSelf: 'flex-end', minHeight: 40}}
        accessoryLeft={save ? iconSave : iconEdit}
        onPress={() => {
          save ? setSave(false) : setSave(true);
        }}
      />
    </Layout>
  );
}
