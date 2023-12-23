/* eslint-disable react-hooks/exhaustive-deps */
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
  const [search, setSearch] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageState, setPageState] = React.useState({
    onceEffect: true,
    customerPage: 0,
    maxPage: 0,
    search: null,
  });

  useEffect(() => {
    if (pageState.onceEffect) {
      if (
        pageState.customerPage + 1 < pageState.maxPage ||
        pageState.maxPage === 0
      ) {
        GetToken().then(async responseToken => {
          if (responseToken !== null) {
            await GetCustomersAPI(
              responseToken,
              search,
              pageState.customerPage + 1,
              50,
            ).then(responseCustomers => {
              if (
                responseCustomers.code === 200 &&
                responseCustomers.data.pagination.total_data > 0
              ) {
                pageState.onceEffect = false;
                pageState.customerPage = pageState.customerPage + 1;
                pageState.maxPage =
                  responseCustomers.data.pagination.total_page;

                responseCustomers.data.customers.map(idx => {
                  tempData.set(idx.id, idx);
                });

                setPageState(pageState);

                setData(
                  Array.from(tempData, ([name, value]) => ({name, value})),
                );
              } else {
                setData([]);
              }
            });
          }
        });
      }
    }
  }, [refreshing]);

  const renderItemAccessory = useCallback((id, name, phoneNumber, address) => {
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
  }, []);

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
    [],
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const onRefreshAndReset = React.useCallback(() => {
    tempData = new Map();
    pageState.onceEffect = true;
    pageState.customerPage = 0;
    pageState.maxPage = 0;
    setPageState(pageState);
    onRefresh();
  });

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
            onPress={() => onRefreshAndReset()}>
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
            onEndReached={() => {
              pageState.onceEffect = true;
              setPageState(pageState);
              onRefresh();
            }}
            ItemSeparatorComponent={Divider}
            removeClippedSubviews={true}
            estimatedItemSize={50}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshAndReset}
              />
            }
          />
        </Layout>
      </Layout>
    </Layout>
  );
}
