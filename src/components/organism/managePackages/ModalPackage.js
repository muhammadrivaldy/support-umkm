/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Card, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {CustomPrice} from '../../../models/PriceTypes';

export function ModalPackage(
  modalVisible,
  setModalVisible,
  numberInMoney,
  hours,
  setHours,
  doFunc,
  priceType,
) {
  return (
    <Modal
      visible={modalVisible}
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      onBackdropPress={() => setModalVisible(false)}>
      <Card>
        {priceType !== CustomPrice ? (
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
        ) : null}

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

        <Button
          onPress={() => {
            doFunc(numberInMoney.valueInNumber, hours);
          }}>
          Submit
        </Button>
      </Card>
    </Modal>
  );
}
