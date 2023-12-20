/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect} from 'react';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {GetCustomersAPI} from '../../stores/Services';
import {GetToken} from '../../stores/Storages';
import {RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';

const SearchIcon = props => <Icon {...props} name="search-outline" />;
const PlusIcon = props => <Icon {...props} name="plus-outline" />;
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

var tempData = new Map();

export function CreateOrder_CustomerListScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [onceEffect, setOnceEffect] = React.useState(true);
  const [maxPage, setMaxPage] = React.useState(0);
  const [customerPage, setCustomerPage] = React.useState(0);
  const [search, setSearch] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (onceEffect) {
      if (customerPage + 1 < maxPage || maxPage === 0) {
        GetToken().then(async responseToken => {
          if (responseToken !== null) {
            await GetCustomersAPI(
              responseToken,
              search,
              customerPage + 1,
              10,
            ).then(responseCustomers => {
              if (
                responseCustomers.code === 200 &&
                responseCustomers.data.pagination.total_data > 0
              ) {
                setCustomerPage(customerPage + 1);
                setMaxPage(responseCustomers.data.pagination.total_page);
                responseCustomers.data.customers.map(idx => {
                  tempData.set(idx.id, idx);
                });

                setData(
                  Array.from(tempData, ([name, value]) => ({name, value})),
                );
              }
            });
          }
        });

        setOnceEffect(false);
      }
    }
  }, [
    data,
    onceEffect,
    maxPage,
    customerPage,
    search,
    setData,
    setMaxPage,
    setOnceEffect,
  ]);

  const renderItemAccessory = useCallback(
    (id, name, phoneNumber, address) => {
      return () => (
        <Button
          size="tiny"
          status="info"
          onPress={() => {
            navigation.navigate('CreateOrderScreen', {
              id: id,
              name: name,
              phoneNumber: phoneNumber,
              address: address,
            });
          }}>
          Pilih
        </Button>
      );
    },
    [navigation],
  );

  const renderItemIcon = useCallback(
    props => <Icon {...props} name="person" />,
    [],
  );

  const renderItem = useCallback(
    ({item, index}) => (
      <ListItem
        key={item.name}
        title={item.value.name}
        description={TextProps => (
          <>
            <Text {...TextProps}>{item.value.phone_number}</Text>
            <Text {...TextProps}>{item.value.address}</Text>
          </>
        )}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory(
          item.value.id,
          item.value.name,
          item.value.phone_number,
          item.value.address,
        )}
      />
    ),
    [renderItemIcon, renderItemAccessory],
  );

  const onRefresh = React.useCallback(() => {
    setOnceEffect(true);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <Layout style={{flex: 1}}>
      <TopNavigation
        accessoryLeft={BackAction(navigation)}
        title="Pilih Pelanggan"
        navigation={navigation}
      />

      <Divider />

      <Layout
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}>
        <Layout style={{marginVertical: 4}} />

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
            accessoryLeft={PlusIcon}
            onPress={() => {
              navigation.navigate('CreateCustomerScreen');
            }}>
            {TextProps => {
              TextProps.style.fontFamily = 'Raleway-Bold';
              TextProps.style.fontWeight = '600';
              TextProps.style.marginTop = -3;
              return <Text {...TextProps}>Tambah Pelanggan</Text>;
            }}
          </Button>
        </Layout>

        <Layout
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 8,
          }}>
          <Input
            placeholder="Nama, No hp, Alamat ..."
            accessoryRight={SearchIcon}
            onChangeText={text => setSearch(text)}
            style={{flex: 1, marginRight: 8}}
          />

          <Button
            status="info"
            size="small"
            onPress={async () => {
              tempData = new Map();
              setCustomerPage(0);
              setMaxPage(0);
              setOnceEffect(true);
            }}>
            {TextProps => {
              TextProps.style.fontFamily = 'Raleway-Bold';
              TextProps.style.fontWeight = '600';
              return <Text {...TextProps}>Cari</Text>;
            }}
          </Button>
        </Layout>

        <Layout style={{marginVertical: 4}} />

        <Layout style={{flex: 1}}>
          <FlashList
            data={data}
            renderItem={renderItem}
            onScrollEndDrag={async () => setOnceEffect(true)}
            ItemSeparatorComponent={Divider}
            removeClippedSubviews={true}
            estimatedItemSize={50}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </Layout>
      </Layout>
    </Layout>
  );
}
