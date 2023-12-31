/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, Layout, Modal, Spinner, Text} from '@ui-kitten/components';

export function Loading(visible, setVisible) {
  return (
    <Modal
      visible={visible}
      onBackdropPress={() => setVisible(false)}
      backdropStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Card>
        <Layout style={{marginLeft: 12, marginBottom: 6}}>
          <Spinner size="giant" status="basic" />
        </Layout>
        <Text>Loading</Text>
      </Card>
    </Modal>
  );
}
