/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Card, Input, Layout, Modal, Text} from '@ui-kitten/components';

export function ModalPackage(
  modalVisible,
  setModalVisible,
  numberInMoney,
  hours,
  setHours,
  doAction,
) {
  return (
    <Modal
      visible={modalVisible}
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      onBackdropPress={() => setModalVisible(false)}>
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
          inputMode="numeric"
          value={hours}
          onChangeText={text => setHours(text)}
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

        <Button onPress={doAction}>Submit</Button>
      </Card>
    </Modal>
  );
}
