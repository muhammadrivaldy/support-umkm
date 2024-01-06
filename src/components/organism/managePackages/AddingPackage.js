/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {FormattingNumberToMoneyWithState} from '../../../utils/Currency';
import {PostPackageByStoreIdAPI} from '../../../stores/Services';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {DefaultErrorToast} from '../../../utils/DefaultToast';
import {ModalPackage} from './ModalPackage';

export function AddingPackage(
  serviceId,
  priceType,
  setLoadingVisible,
  setOnce,
) {
  const [modalVisible, setModalVisible] = useState(false);
  const [hours, setHours] = useState(null);
  const numberInMoney = FormattingNumberToMoneyWithState();

  const createPackage = (serviceId, price, hours) => {
    return () => {
      setLoadingVisible(true);
      setModalVisible(false);

      GetToken().then(token => {
        GetLaundryInfo().then(laundryInfo => {
          PostPackageByStoreIdAPI(
            token,
            laundryInfo.id,
            serviceId,
            price,
            hours,
          )
            .then(response => {
              if (response.data.code === 201) {
                numberInMoney.setValue(0);
                setHours(null);
                setOnce(true);
              }
            })
            .catch(() => {
              DefaultErrorToast();
            });
        });
      });
    };
  };

  return (
    <>
      {ModalPackage(
        modalVisible,
        setModalVisible,
        numberInMoney,
        hours,
        setHours,
        createPackage(serviceId, numberInMoney.valueInNumber, hours),
        priceType,
      )}

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
          onPress={() => setModalVisible(true)}>
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
