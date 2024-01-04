/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';
import {Header} from './Header';
import {AddingService} from './AddingService';
import {
  GetPriceTypesAPI,
  GetServicesByStoreIdAPINew,
} from '../../../stores/Services';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {DefaultErrorToast} from '../../../utils/DefaultToast';
import {RenderItem} from './RenderItem';
import {FlashList} from '@shopify/flash-list';
import {RefreshControl} from 'react-native';
import {ModalService} from './ModalService';
import {Loading} from '../../molecules/Loading';

export function ManageServicesScreen(props) {
  const [once, setOnce] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [priceTypes, setPriceTypes] = useState(null);

  useEffect(() => {
    if (once) {
      setOnce(false);
      setRefreshing(true);

      GetToken().then(token => {
        GetLaundryInfo().then(laundryInfo => {
          GetServicesByStoreIdAPINew(token, laundryInfo.id)
            .then(response => {
              if (response.data.code === 200) {
                let data = [];
                let responseData = response.data.data;

                responseData.map(value => {
                  data.push({
                    id: value.id,
                    serviceName: value.string,
                    totalPackages: value.total_packages,
                    storeId: value.store_id,
                  });
                });

                GetPriceTypesAPI(token)
                  .then(response => {
                    if (response.data.code === 200) {
                      setPriceTypes(response.data.data);
                      setData(data);
                      setRefreshing(false);
                      setLoadingVisible(false);
                    }
                  })
                  .catch(() => {
                    DefaultErrorToast();
                    setRefreshing(false);
                  });
              }
            })
            .catch(() => {
              DefaultErrorToast();
              setRefreshing(false);
            });
        });
      });
    }
  }, [refreshing]);

  const mainContent = data => {
    return (
      <FlashList
        data={data.length === 0 ? [] : data}
        renderItem={RenderItem(
          props,
          setOnce,
          setRefreshing,
          setLoadingVisible,
        )}
        estimatedItemSize={15}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setData([]);
              setOnce(true);
              setRefreshing(true);
            }}
          />
        }
      />
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {Header(props)}
      {AddingService(setModalVisible)}
      {mainContent(data)}
      {Loading(loadingVisible, setLoadingVisible)}
      {ModalService(
        modalVisible,
        setModalVisible,
        priceTypes,
        setOnce,
        setRefreshing,
      )}
    </Layout>
  );
}
