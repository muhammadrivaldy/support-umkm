/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Button, Card, Icon, Layout, Modal, Text} from '@ui-kitten/components';

export function AddingService() {
  const [visible, setVisible] = useState(false);

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
          <Text>Hello World</Text>
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
          accessoryLeft={props => <Icon {...props} name="plus-outline" />}
          onPress={() => {
            setVisible(true);
            console.log('Tambah Jasa');
          }}>
          {TextProps => {
            TextProps.style.fontFamily = 'Raleway-Bold';
            TextProps.style.fontWeight = '600';
            TextProps.style.marginTop = -3;
            return <Text {...TextProps}>Tambah Jasa</Text>;
          }}
        </Button>
      </Layout>
    </>
  );
}
