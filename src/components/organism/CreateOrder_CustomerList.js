/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {GetCustomersAPI} from '../../stores/Services';
import {GetToken} from '../../stores/Storages';
import {RefreshControl} from 'react-native';

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

export function CreateOrder_CustomerListScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [onceEffect, setOnceEffect] = React.useState(true);
  const [maxPage, setMaxPage] = React.useState(0);
  const [customerPage, setCustomerPage] = React.useState(1);
  const [search, setSearch] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (onceEffect) {
      GetToken().then(async responseToken => {
        if (responseToken !== null) {
          await GetCustomersAPI(responseToken, search, 1, 10).then(
            responseCustomers => {
              setCustomerPage(1);
              if (responseCustomers.data.pagination.total_data > 0) {
                setMaxPage(responseCustomers.data.pagination.total_page);
                let dataCust = [];
                responseCustomers.data.customers.map(idx => {
                  dataCust.push(idx);
                });
                setData(dataCust);
              } else {
                setData([]);
              }
            },
          );
        }
      });

      setOnceEffect(false);
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

  const renderItemAccessory = (id, name, phoneNumber, address) => {
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
  };

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => (
    <ListItem
      key={item.name}
      title={item.name}
      description={TextProps => (
        <>
          <Text {...TextProps}>{item.phone_number}</Text>
          <Text {...TextProps}>{item.address}</Text>
        </>
      )}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory(
        item.id,
        item.name,
        item.phone_number,
        item.address,
      )}
    />
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
              setCustomerPage(1);

              await GetToken().then(async responseToken => {
                if (responseToken !== null) {
                  await GetCustomersAPI(responseToken, search, 1, 10).then(
                    responseCustomers => {
                      if (responseCustomers.data.pagination.total_data > 0) {
                        setMaxPage(
                          responseCustomers.data.pagination.total_page,
                        );
                        let dataCust = [];
                        responseCustomers.data.customers.map(idx => {
                          dataCust.push(idx);
                        });
                        setData(dataCust);
                      } else {
                        setData([]);
                      }
                    },
                  );
                }
              });
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
          <List
            data={data}
            renderItem={renderItem}
            onScrollEndDrag={async () => {
              if (customerPage < maxPage) {
                GetToken().then(async responseToken => {
                  if (responseToken !== null) {
                    await GetCustomersAPI(
                      responseToken,
                      search,
                      customerPage + 1,
                      10,
                    ).then(responseCustomers => {
                      let dataCust = data;
                      responseCustomers.data.customers.map(idx => {
                        dataCust.push(idx);
                      });
                      setData(dataCust);
                    });
                  }
                });

                setCustomerPage(customerPage + 1);
              }
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{backgroundColor: 'white'}}
            ItemSeparatorComponent={Divider}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}
