/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';
import {FormatCurrency, FormatTest} from '../../../utils/Currency';

export function AddingPackage(props) {
  const [visible, setVisible] = useState(false);
  // const [value, setValue] = FormatCurrency();
  const [value, setValue] = useState(null);

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => {
          console.log('onBackdropPress');
          setVisible(false);
        }}>
        <Card>
          <Input
            placeholder="Harga"
            inputMode="numeric"
            value={value !== null ? FormatTest().format(value) : value}
            onChangeText={text => setValue(text)}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Estimasi selesai (dalam jam) "
            style={{marginBottom: 10}}
          />

          <Button>Submit</Button>
        </Card>
      </Modal>

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
            setVisible(true);
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
    </>
  );
}
