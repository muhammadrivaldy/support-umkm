/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Button,
  Icon,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';

const iconEdit = props => <Icon {...props} name="edit-outline" />;
const iconSave = props => <Icon {...props} name="save-outline" />;

export function FormServiceType(props) {
  const [save, setSave] = useState(false);

  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
      <Select
        style={{flex: 1}}
        disabled={!save}
        label={TextProps => {
          TextProps.style[1].fontWeight = '600';
          TextProps.style[1].color = save
            ? TextProps.style[1].color
            : 'rgba(143, 155, 179, 0.48)';
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
