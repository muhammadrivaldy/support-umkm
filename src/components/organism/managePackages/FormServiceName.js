/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {PutServiceByServiceIdAndStoreIdAPI} from '../../../stores/Services';
import {DefaultErrorToast} from '../../../utils/DefaultToast';

const iconEdit = props => <Icon {...props} name="edit-outline" />;
const iconSave = props => <Icon {...props} name="save-outline" />;

export function FormServiceName(service, setLoadingVisible, setOnce) {
  const [save, setSave] = useState(false);
  const [serviceName, setServiceName] = useState(null);

  const updatePriceType = doFunc => {
    GetToken().then(token => {
      GetLaundryInfo().then(laundryInfo => {
        PutServiceByServiceIdAndStoreIdAPI(
          token,
          service.service_id,
          laundryInfo.id,
          serviceName,
          service.price_type,
        )
          .then(doFunc)
          .catch(DefaultErrorToast);
      });
    });
  };

  const getServiceName = () => {
    if (service === null) {
      return null;
    } else if (serviceName !== null) {
      return serviceName;
    } else {
      return service.service_name;
    }
  };

  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
      <Input
        style={{flex: 1}}
        disabled={!save}
        placeholder="Nama jasa kamu"
        value={getServiceName()}
        onChangeText={text => setServiceName(text)}
        label={TextProps => {
          TextProps.style[0].fontWeight = '600';
          return (
            <Text category="s1" {...TextProps}>
              Nama Jasa
            </Text>
          );
        }}
      />

      <Layout style={{marginHorizontal: 4}} />

      <Button
        size="small"
        status={save ? 'info' : 'primary'}
        style={{alignSelf: 'flex-end', minHeight: 40}}
        accessoryLeft={save ? iconSave : iconEdit}
        onPress={() => {
          if (save) {
            setSave(false);
            setLoadingVisible(true);
            updatePriceType(() => {
              setOnce(true);
            });
          } else {
            setSave(true);
          }
        }}
      />
    </Layout>
  );
}
