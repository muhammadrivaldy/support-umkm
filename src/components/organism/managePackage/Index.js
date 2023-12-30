/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';
import {Header} from './Header';
import {ButtonService} from './ButtonService';
import {GetServicesByStoreIdAPINew} from '../../../stores/Services';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {DefaultErrorToast} from '../../../utils/DefaultToast';
import {RenderItem} from './RenderItem';
import {FlashList} from '@shopify/flash-list';
import {RefreshControl} from 'react-native';

export function ManagePackageScreen(props) {
  const [once, setOnce] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (once) {
      setOnce(false);
      setRefreshing(true);

      GetToken().then(token => {
        GetLaundryInfo().then(laundryInfo => {
          GetServicesByStoreIdAPINew(token, laundryInfo.id).then(response => {
            if (response.data.code === 200) {
              let responseData = response.data.data;

              responseData.map(value => {
                data.push({
                  id: value.id,
                  serviceName: value.string,
                  totalPackages: value.total_packages,
                });
              });

              setData(data);
              setRefreshing(false);
            } else {
              DefaultErrorToast();
            }
          });
        });
      });

      if (refreshing) {
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }
    }
  });

  const mainContent = data => {
    return (
      <FlashList
        data={data.length === 0 ? [] : data}
        renderItem={RenderItem}
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
      {ButtonService()}
      {mainContent(data)}
    </Layout>
  );
}
