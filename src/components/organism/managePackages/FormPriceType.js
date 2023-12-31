/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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

export function FormPriceType(
  priceTypes,
  currentPriceType,
  loadingVisible,
  setLoadingVisible,
  setOnce,
) {
  const [save, setSave] = useState(false);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (selected === null) {
      priceTypes.map(val => {
        if (val.id === currentPriceType) {
          setValue(val.name.id);
        }
      });
    }
  }, [loadingVisible]);

  useEffect(() => {
    if (selected !== null) {
      setValue(priceTypes[selected.row].name.id);
    }
  }, [selected]);

  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
      <Select
        style={{flex: 1}}
        disabled={!save}
        onSelect={index => setSelected(index)}
        value={value}
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
        {priceTypes.map(val => {
          return <SelectItem title={val.name.id} key={val.key} />;
        })}
      </Select>

      <Layout style={{marginHorizontal: 4}} />

      <Button
        size="small"
        status={save ? 'info' : 'primary'}
        style={{alignSelf: 'flex-end', minHeight: 40}}
        accessoryLeft={save ? iconSave : iconEdit}
        onPress={() => {
          if (save) {
            setSave(false);
            setOnce(true);
            setLoadingVisible(true);
          } else {
            setSave(true);
          }
        }}
      />
    </Layout>
  );
}
