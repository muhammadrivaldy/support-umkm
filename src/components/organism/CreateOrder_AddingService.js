/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {RefreshControl, ScrollView} from 'react-native';
import {GetLaundryInfo, GetToken} from '../../stores/Storages';
import {GetServicesByStoreIdAPI} from '../../stores/Services';

export function CreateOrder_AddingServiceScreen({navigation}) {
  const [selectedServiceName, setSelectedServiceName] = React.useState(null);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [services, setServices] = React.useState(null);

  useEffect(() => {
    if (services === null) {
      GetToken().then(async token => {
        await GetLaundryInfo().then(async responseLaundryInfo => {
          await GetServicesByStoreIdAPI(token, responseLaundryInfo.id).then(
            responseServices => {
              setServices(responseServices);
            },
          );
        });
      });
    }
  }, [refreshing]);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1500);
  // }, []);

  const serviceItems = () => {
    var items = [];

    if (services !== null) {
      services.data.map(idx => {
        items.push(<SelectItem title={idx.string} key={idx.id} />);
      });
    }

    return items;
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {/* refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }> */}
      <Layout style={{flex: 1}}>
        <TopNavigation
          title="Tambah Jasa"
          accessoryLeft={BackAction(navigation)}
          navigation={navigation}
        />

        <Divider />

        <Layout style={{marginVertical: 4}} />

        <Layout
          style={{
            flex: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}>
          <Select
            placeholder={'Pilih service'}
            label={TextProps => {
              TextProps.style[1].fontWeight = '600';
              return (
                <Text category="s1" {...TextProps}>
                  Service
                </Text>
              );
            }}
            selectedIndex={selectedServiceName}
            onSelect={index => setSelectedServiceName(index)}>
            {serviceItems()}
          </Select>

          <Layout style={{marginVertical: 4}} />

          <Select
            selectedIndex={selectedPackage}
            placeholder={'Pilih paket nya'}
            label={TextProps => {
              TextProps.style[1].fontWeight = '600';
              return (
                <Text category="s1" {...TextProps}>
                  Paket
                </Text>
              );
            }}
            value={ShowingItem(selectedPackage)}
            onSelect={index => setSelectedPackage(index)}>
            {RenderItems()}
          </Select>

          <Layout style={{marginVertical: 4}} />

          <Input
            placeholder="Masukkan ukuran order"
            inputMode="decimal"
            label={TextProps => {
              TextProps.style[0].fontWeight = '600';
              return (
                <Text category="s1" {...TextProps}>
                  Ukuran
                </Text>
              );
            }}
            accessoryRight={() => {
              return (
                <Layout
                  style={{
                    borderWidth: 0,
                    minWidth: 40,
                    backgroundColor: 'transparent',
                  }}>
                  <Text category="s2" style={{textAlign: 'center'}}>
                    Rp
                  </Text>
                </Layout>
              );
            }}
          />

          <Layout style={{marginVertical: 4}} />

          <Input
            multiline={true}
            placeholder="Masukkan detail order"
            textStyle={{minHeight: 100}}
            label={TextProps => {
              TextProps.style[0].fontWeight = '600';
              return (
                <Text category="s1" {...TextProps}>
                  Deskripsi
                </Text>
              );
            }}
          />
        </Layout>

        <Button
          style={{
            marginHorizontal: 8,
            marginBottom: 8,
          }}
          onPress={() => {
            navigation.navigate('CreateOrderScreen');
          }}>
          {TextProps => {
            TextProps.style.fontFamily = 'Raleway-Bold';
            TextProps.style.fontWeight = '600';
            return <Text {...TextProps}>Tambahkan Jasa</Text>;
          }}
        </Button>
      </Layout>
    </ScrollView>
  );
}

const PackageList = [
  {
    name: 'Paket 1 (Rp. 30.000/Kg)',
    desc: 'Estimasi waktu pengerjaan 2 hari',
  },
  {
    name: 'Paket 2 (Rp. 25.000/Kg)',
    desc: 'Estimasi waktu pengerjaan 3 hari',
  },
];

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackAction = navigation => {
  return () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

const ShowingItem = selectedPackage => {
  return selectedPackage !== undefined && selectedPackage !== null
    ? PackageList[selectedPackage.row].name
    : null;
};

const RenderItems = () =>
  PackageList.map(idx => (
    <SelectItem
      key={idx.name}
      title={TextProps => (
        <Layout style={{backgroundColor: 'transparent'}}>
          <Text {...TextProps}>{idx.name}</Text>
          <Text
            category="c2"
            style={{
              marginHorizontal: TextProps.style[1].marginHorizontal,
            }}>
            {idx.desc}
          </Text>
        </Layout>
      )}
    />
  ));
