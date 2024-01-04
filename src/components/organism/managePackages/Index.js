/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Card, Layout} from '@ui-kitten/components';
import {Header} from './Header';
import {FormServiceName} from './FormServiceName';
import {FormPriceType} from './FormPriceType';
import {FlashList} from '@shopify/flash-list';
import {RenderItem} from './RenderItem';
import {Loading} from '../../molecules/Loading';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {
  GetPackagesByServiceIdAndStoreIdAPINew,
  GetPriceTypesAPI,
} from '../../../stores/Services';
import {DefaultErrorToast} from '../../../utils/DefaultToast';
import {AddingPackage} from './AddingPackage';
import {ModalPackage} from './ModalPackage';
import {FormattingNumberToMoney} from '../../../utils/Currency';

export function ManagePackagesScreen(props) {
  const {serviceId} = props.route.params;
  const [once, setOnce] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [service, setService] = useState(null);
  const [priceTypes, setPriceTypes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hours, setHours] = useState(null);
  const [doFunc, setDoFunc] = useState(null);
  const numberInMoney = FormattingNumberToMoney();

  useEffect(() => {
    if (service !== null && priceTypes.length > 0) {
      setLoadingVisible(false);
    }
  }, [service, priceTypes]);

  useEffect(() => {
    if (once) {
      setOnce(false);
      setService(null);
      setPriceTypes([]);

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
            .catch(() => {
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
            .catch(() => {
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
          data={service === null ? [] : service.packages}
          renderItem={RenderItem(
            props,
            setLoadingVisible,
            setModalVisible,
            setOnce,
            setDoFunc,
            setHours,
            numberInMoney,
          )}
          estimatedItemSize={10}
        />
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {Loading(loadingVisible, setLoadingVisible)}
      {AddingPackage(
        serviceId,
        service === null ? 0 : service.price_type,
        setLoadingVisible,
        setOnce,
      )}
      {Header(props)}
      {ModalPackage(
        modalVisible,
        setModalVisible,
        numberInMoney,
        hours,
        setHours,
        doFunc,
        service === null ? 0 : service.price_type,
      )}
      <Layout style={{flex: 1, paddingVertical: 8, paddingHorizontal: 8}}>
        <Card status="success" disabled={true}>
          {FormServiceName(service, setLoadingVisible, setOnce)}
          <Layout style={{marginVertical: 4}} />
          {FormPriceType(
            priceTypes,
            service,
            loadingVisible,
            setLoadingVisible,
            setOnce,
          )}
          <Layout style={{marginVertical: 2}} />
        </Card>

        {mainContent()}
      </Layout>
    </Layout>
  );
}
