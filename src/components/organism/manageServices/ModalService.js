/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {PostServiceByStoreIdAPI} from '../../../stores/Services';
import {DefaultErrorToast} from '../../../utils/DefaultToast';
import Toast from 'react-native-toast-message';

export function ModalService(
  modalVisible,
  setModalVisible,
  priceTypes,
  setOnce,
  setRefreshing,
  setLoadingVisible,
) {
  const [serviceName, setServiceName] = useState(null);
  const [selected, setSelected] = useState(null);

  const getId = () => {
    return selected !== null ? priceTypes[selected.row].id : null;
  };

  const getName = () => {
    return selected !== null ? priceTypes[selected.row].name.id : null;
  };

  return (
    <Modal
      visible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
        setServiceName(null);
        setSelected(null);
      }}
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <Card>
        <Input
          placeholder="Nama jasa"
          value={serviceName}
          onChangeText={text => setServiceName(text)}
          style={{marginBottom: 10, minWidth: 250}}
        />

        <Select
          style={{marginBottom: 10}}
          placeholder={'Tipe harga jasa'}
          onSelect={index => setSelected(index)}
          value={getName()}>
          {priceTypes !== null
            ? priceTypes.map(value => {
                let name = value.name.id;
                return <SelectItem title={name} key={name} />;
              })
            : null}
        </Select>

        <Button
          onPress={() => {
            setModalVisible(false);
            setLoadingVisible(true);

            GetToken().then(token => {
              GetLaundryInfo().then(laundryInfo => {
                PostServiceByStoreIdAPI(
                  token,
                  laundryInfo.id,
                  serviceName,
                  getId(),
                )
                  .then(() => {
                    setServiceName(null);
                    setSelected(null);
                    setOnce(true);
                    setRefreshing(true);
                  })
                  .catch(error => {
                    if (error.code === 409) {
                      Toast.show({
                        type: 'error',
                        text1: 'Nama jasa sudah terdaftar 😁',
                        text1Style: {
                          fontFamily: 'Raleway-Bold',
                          fontWeight: '600',
                        },
                        text2: 'Kamu tidak bisa menggunakan nama yang sama',
                        text2Style: {fontFamily: 'Raleway-Regular'},
                        position: 'bottom',
                      });
                    } else {
                      DefaultErrorToast();
                    }
                  });
              });
            });
          }}>
          Submit
        </Button>
      </Card>
    </Modal>
  );
}
