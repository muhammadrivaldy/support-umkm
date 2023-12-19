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
} from '@ui-kitten/components';
import {Dimensions, RefreshControl} from 'react-native';
import {DeleteCustomersAPI, GetCustomersAPI} from '../../stores/Services';
import {GetToken} from '../../stores/Storages';

const SearchIcon = props => <Icon {...props} name="search-outline" />;
const PlusIcon = props => <Icon {...props} name="plus-outline" />;

export function CustomerListScreen({navigation}) {
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

  // const renderItemAccessory = () => (
  //   <Button size="tiny" status="danger">
  //     Hapus
  //   </Button>
  // );

  const renderItemAccessory = customerId => {
    return () => (
      <Button
        size="tiny"
        status="danger"
        onPress={async () => {
          await GetToken().then(async responseToken => {
            if (responseToken !== null) {
              await DeleteCustomersAPI(responseToken, customerId);
              setOnceEffect(true);
            }
          });
        }}>
        Hapus
      </Button>
    );
  };

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => (
    <ListItem
      title={item.name}
      description={TextProps => (
        <>
          <Text {...TextProps}>{item.phone_number}</Text>
          <Text {...TextProps}>{item.address}</Text>
        </>
      )}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory(item.id)}
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
    <Layout
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
            console.log(customerPage);
            console.log(maxPage);
            // navigation.navigate('CreateCustomerScreen');
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
          placeholder="Nama atau no hp ..."
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
  );
}
