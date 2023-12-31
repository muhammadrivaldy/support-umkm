/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Card, Layout} from '@ui-kitten/components';
import {Header} from './Header';
import {FormServiceName} from './FormServiceName';
import {FormPriceType} from './FormPriceType';
import {ButtonPackage} from './ButtonPackage';
import {FlashList} from '@shopify/flash-list';
import {RenderItem} from './RenderItem';
import {Loading} from '../../molecules/Loading';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {
  GetPackagesByServiceIdAndStoreIdAPINew,
  GetPriceTypesAPI,
} from '../../../stores/Services';
import {DefaultErrorToast} from '../../../utils/DefaultToast';

export function ManagePackagesScreen(props) {
  const {serviceId} = props.route.params;
  const [once, setOnce] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [service, setService] = useState(null);
  const [priceTypes, setPriceTypes] = useState([]);

  useEffect(() => {
    if (service !== null && priceTypes.length > 0) {
      setLoadingVisible(false);
    }
  }, [service, priceTypes]);

  useEffect(() => {
    if (once) {
      setOnce(false);

      GetToken().then(token => {
        GetLaundryInfo().then(laundryInfo => {
          GetPackagesByServiceIdAndStoreIdAPINew(
            token,
            serviceId,
            laundryInfo.id,
          )
            .then(response => {
              let responseObject = response.data;
              if (responseObject.code === 200) {
                setService(responseObject.data);
              } else {
                DefaultErrorToast();
              }
            })
            .catch(error => {
              DefaultErrorToast();
            });

          GetPriceTypesAPI(token)
            .then(response => {
              let responseObject = response.data;
              if (responseObject.code === 200) {
                setPriceTypes(responseObject.data);
              } else {
                DefaultErrorToast();
              }
            })
            .catch(error => {
              DefaultErrorToast();
            });
        });
      });
    }
  }, [once]);

  const mainContent = () => {
    return (
      <Layout style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
        <FlashList
          data={[1, 2, 3]}
          renderItem={RenderItem(props)}
          estimatedItemSize={10}
        />
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {Loading(loadingVisible, setLoadingVisible)}
      {ButtonPackage()}
      {Header(props)}
      <Layout style={{flex: 1, paddingVertical: 8, paddingHorizontal: 8}}>
        <Card status="success" disabled={true}>
          {FormServiceName(service)}
          <Layout style={{marginVertical: 4}} />
          {FormPriceType(props)}
          <Layout style={{marginVertical: 2}} />
        </Card>

        {mainContent()}
      </Layout>
    </Layout>
  );
}
