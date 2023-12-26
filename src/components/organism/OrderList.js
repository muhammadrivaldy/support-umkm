/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect} from 'react';
import {
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  RangeDatepicker,
  Select,
  SelectGroup,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {RefreshControl, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {GetToken} from '../../stores/Storages';
import {
  GetOrderPaymentStatusesAPI,
  GetOrderStatusesAPI,
  GetOrdersAPI,
} from '../../stores/Services';

const StarIcon = props => <Icon {...props} name="phone-call-outline" />;
const SearchIcon = props => <Icon {...props} name="search-outline" />;
const PlusIcon = props => <Icon {...props} name="plus-outline" />;

var mapStatus = {};
var mapPaymentStatus = {};
var tempData = new Map();

export function OrderListScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [range, setRange] = React.useState({});
  const [search, setSearch] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(true);
  const [groupedData, setGroupedData] = React.useState({
    Status: [],
    Pembayaran: [],
  });
  const [pageState, setPageState] = React.useState({
    onceEffect: true,
    orderPage: 0,
    maxPage: 0,
    search: '',
    startDate: 0,
    endDate: 0,
    statusOrders: [],
    statusPayments: [],
  });

  // use effect for rendering data orders
  useEffect(() => {
    if (pageState.onceEffect) {
      if (
        pageState.orderPage + 1 < pageState.maxPage ||
        pageState.maxPage === 0
      ) {
        GetToken().then(async responseToken => {
          if (responseToken !== null) {
            await GetOrdersAPI(responseToken).then(response => {
              if (
                response.code === 200 &&
                response.data.pagination.total_data > 0
              ) {
                pageState.onceEffect = false;
                pageState.orderPage = pageState.orderPage + 1;
                pageState.maxPage = response.data.pagination.total_page;

                response.data.orders.map(idx => {
                  tempData.set(idx.order_id, idx);
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

  const initServices = () => {
    GetToken().then(async token => {
      if (groupedData.Status.length === 0) {
        GetOrderStatusesAPI(token).then(response => {
          if (response.code === 200) {
            response.data.map(idx => {
              mapStatus[idx.name] = idx.id;
              groupedData.Status.push(idx.name);
            });
            setGroupedData(groupedData);
          }
        });
      }

      if (groupedData.Pembayaran.length === 0) {
        GetOrderPaymentStatusesAPI(token).then(response => {
          if (response.code === 200) {
            response.data.map(idx => {
              mapPaymentStatus[idx.name] = idx.id;
              groupedData.Pembayaran.push(idx.name);
            });
            setGroupedData(groupedData);
          }
        });
      }
    });
  };

  initServices();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const groupDisplayValues = multiSelectedIndex.map(idx => {
    const groupTitle = Object.keys(groupedData)[idx.section];
    return groupedData[groupTitle][idx.row];
  });

  const renderItem = useCallback(({item, index}) => {
    var order = item.value;

    return (
      <Card status="basic" style={{marginBottom: 8}}>
        <Layout
          style={{
            flexDirection: 'row',
            alignContent: 'space-around',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
            <Text category="s1">{order.customer_name}</Text>
            <Text category="p2">{order.customer_phone}</Text>
          </Layout>

          <Button
            status="info"
            accessoryLeft={StarIcon}
            style={{maxHeight: 40, maxWidth: 40}}
          />
        </Layout>

        <View style={{marginVertical: 4}} />
        <Divider />
        <View style={{marginVertical: 4}} />

        <Layout
          style={{
            flexDirection: 'row',
            alignContent: 'space-around',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
            <Text category="p2">
              Status: <Text category="s2">{order.status_name}</Text>{' '}
            </Text>
            <Text category="p2">
              Pembayaran: <Text category="s2">{order.payment_status_name}</Text>{' '}
            </Text>
            {/* <Text category="p2">
              Tenggat Waktu: <Text category="s2">{info.item.deadline}</Text>{' '}
            </Text>
            <Text category="p2">
              Dibuat: <Text category="s2">{info.item.createdAt}</Text>{' '}
            </Text> */}
          </Layout>

          <Layout style={{backgroundColor: 'transparent'}}>
            <Button status="primary" size="tiny" disabled={true}>
              Lunas
            </Button>
            <View style={{marginVertical: 4}} />
            <Button status="primary" size="tiny">
              Selesai
            </Button>
            <View style={{marginVertical: 4}} />
            <Button status="danger" size="tiny">
              Batal
            </Button>
          </Layout>
        </Layout>
      </Card>
    );
  }, []);

  return (
    <Layout
      level="1"
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
            navigation.navigate('CreateOrder_CustomerListScreen');
          }}>
          {TextProps => {
            TextProps.style.fontFamily = 'Raleway-Bold';
            TextProps.style.fontWeight = '600';
            TextProps.style.marginTop = -3;
            return <Text {...TextProps}>Buat Order</Text>;
          }}
        </Button>
      </Layout>

      <Input
        placeholder="Nama atau No hp ..."
        value={search}
        accessoryRight={SearchIcon}
        onChangeText={text => setSearch(text)}
      />

      <Layout style={{marginVertical: 4}} />

      <Layout style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
        <Select
          style={{flex: 1, marginRight: 3}}
          multiSelect={true}
          placeholder="Filter pencarian kamu disini"
          value={groupDisplayValues.join(', ')}
          selectedIndex={multiSelectedIndex}
          onSelect={index => setMultiSelectedIndex(index)}>
          {Object.keys(groupedData).map(title => (
            <SelectGroup title={title} key={title}>
              {groupedData[title].map(idx => (
                <SelectItem title={idx} key={idx} />
              ))}
            </SelectGroup>
          ))}
        </Select>

        <RangeDatepicker
          style={{flex: 1, marginLeft: 3}}
          min={new Date('2023-12-01')}
          max={new Date('2024-12-01')}
          range={range}
          onSelect={nextRange => setRange(nextRange)}
        />
      </Layout>

      <Layout style={{marginVertical: 4}} />

      <Button
        status="info"
        onPress={() => {
          // console.log(search);
          // console.log(multiSelectedIndex);
          // console.log(range);
        }}>
        {TextProps => {
          TextProps.style.fontFamily = 'Raleway-Bold';
          TextProps.style.fontWeight = '600';
          return <Text {...TextProps}>Cari</Text>;
        }}
      </Button>

      <Layout style={{marginVertical: 8}} />

      <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
        <FlashList
          data={data}
          renderItem={renderItem}
          onEndReachedThreshold={1}
          onEndReached={onRefresh}
          estimatedItemSize={50}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setSearch('');
                setMultiSelectedIndex([]);
                setRange({});
                onRefresh();
              }}
            />
          }
        />
      </Layout>
    </Layout>
  );
}
