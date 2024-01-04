/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';
import {FormattingNumberToMoney} from '../../../utils/Currency';

export function AddingPackage(props) {
  const [visible, setVisible] = useState(false);
  const numberInMoney = FormattingNumberToMoney();

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
            value={numberInMoney.getValue()}
            onChangeText={text => numberInMoney.setValue(text)}
            style={{marginBottom: 10}}
            accessoryLeft={() => {
              return (
                <Layout
                  style={{
                    borderWidth: 0,
                    marginLeft: 10,
                    backgroundColor: 'transparent',
                  }}>
                  <Text category="s2" style={{textAlign: 'center'}}>
                    Rp
                  </Text>
                </Layout>
              );
            }}
          />
          <Input
            placeholder="Estimasi selesai "
            style={{marginBottom: 10}}
            accessoryRight={() => {
              return (
                <Layout
                  style={{
                    borderWidth: 0,
                    marginRight: 10,
                    backgroundColor: 'transparent',
                  }}>
                  <Text category="s2" style={{textAlign: 'center'}}>
                    Jam
                  </Text>
                </Layout>
              );
            }}
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
