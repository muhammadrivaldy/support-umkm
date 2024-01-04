/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Button, Icon, Layout, ListItem} from '@ui-kitten/components';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {
  DeletePackageAPI,
  PutPackageByStoreIdAPI,
} from '../../../stores/Services';
import {DefaultErrorToast} from '../../../utils/DefaultToast';

export function RenderItem(
  props,
  setLoadingVisible,
  setModalVisible,
  setOnce,
  setDoFunc,
  setHours,
  numberInMoney,
) {
  const updatePackage = packageId => {
    return (price, hours) => {
      setLoadingVisible(true);
      setModalVisible(false);

      GetToken().then(token => {
        GetLaundryInfo().then(laundryInfo => {
          PutPackageByStoreIdAPI(token, laundryInfo.id, packageId, price, hours)
            .then(response => {
              if (response.data.code === 200) {
                setModalVisible(false);
                setOnce(true);
              }
            })
            .catch(error => {
              DefaultErrorToast();
            });
        });
      });
    };
  };

  return ({item}) => (
    <ListItem
      title={item.name}
      description={`Estimasi pengerjaan ${item.estimation_in_string}`}
      disabled={true}
      accessoryLeft={<Icon {...props} name="book-outline" />}
      accessoryRight={() => {
        return (
          <Layout style={{marginRight: 8, flexDirection: 'row'}}>
            <Button
              size="tiny"
              accessoryLeft={props => <Icon {...props} name="edit-outline" />}
              onPress={() => {
                numberInMoney.setValue(item.price);
                setHours(String(item.estimation_in_hours));
                setModalVisible(true);
                setDoFunc(() => {
                  return updatePackage(item.id);
                });
              }}
            />

            <Layout style={{marginHorizontal: 4}} />

            <Button
              size="tiny"
              status="danger"
              accessoryLeft={props => <Icon {...props} name="trash-outline" />}
              onPress={() => {
                setLoadingVisible(true);

                GetToken().then(token => {
                  GetLaundryInfo().then(laundryInfo => {
                    DeletePackageAPI(token, laundryInfo.id, item.id)
                      .then(response => {
                        if (response.data.code === 200) {
                          setOnce(true);
                        }
                      })
                      .catch(() => {
                        DefaultErrorToast();
                      });
                  });
                });
              }}
            />
          </Layout>
        );
      }}
    />
  );
}
