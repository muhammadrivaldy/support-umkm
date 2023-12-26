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
import {GenerateTimestampToDate} from '../../utils/Time';
import {DefaultErrorToast} from '../../utils/DefaultToast';
import Toast from 'react-native-toast-message';

const StarIcon = props => <Icon {...props} name="phone-call-outline" />;
const SearchIcon = props => <Icon {...props} name="search-outline" />;
const PlusIcon = props => <Icon {...props} name="plus-outline" />;

var tempData = new Map();

export function OrderListScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [range, setRange] = React.useState({});
  const [search, setSearch] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(true);
  const [mapStatus, setMapStatus] = React.useState(new Map());
  const [mapPaymentStatus, setMapPaymentStatus] = React.useState(new Map());
  const [groupedData, setGroupedData] = React.useState({
    Status: [],
    Pembayaran: [],
  });
  const [pageState, setPageState] = React.useState({
    onceEffect: true,
    orderPage: 0,
    maxPage: 0,
  });

  const getStartDateFromRangeInTimestamp = () => {
    return range.startDate ? Date.parse(range.startDate) / 1000 : 0;
  };

  const getEndDateFromRangeInTimestamp = () => {
    return range.endDate ? Date.parse(range.endDate) / 1000 + 86400 : 0;
  };

  const getOrderStatusForFilter = () => {
    let result = [];
    if (multiSelectedIndex.length > 0) {
      multiSelectedIndex.map(idx => {
        if (Object.keys(groupedData)[idx.section] === 'Status') {
          result.push(mapStatus[groupedData.Status[idx.row]]);
        }
      });
    }

    return result;
  };

  const getPaymentStatusForFilter = () => {
    let result = [];
    if (multiSelectedIndex.length > 0) {
      multiSelectedIndex.map(idx => {
        if (Object.keys(groupedData)[idx.section] === 'Pembayaran') {
          result.push(mapPaymentStatus[groupedData.Pembayaran[idx.row]]);
        }
      });
    }

    return result;
  };

  // use effect for rendering data orders
  useEffect(() => {
    if (pageState.onceEffect) {
      if (
        pageState.orderPage + 1 < pageState.maxPage ||
        pageState.maxPage === 0
      ) {
        GetToken().then(async responseToken => {
          if (responseToken !== null) {
            await GetOrdersAPI(
              responseToken,
              search,
              pageState.orderPage + 1,
              10,
              getStartDateFromRangeInTimestamp(),
              getEndDateFromRangeInTimestamp(),
              getOrderStatusForFilter(),
              getPaymentStatusForFilter(),
            ).then(response => {
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
              } else if (
                response.code === 200 &&
                response.data.pagination.total_data === 0
              ) {
                setData([]);
                Toast.show({
                  type: 'info',
                  text1: 'Data yang kamu cari tidak ada 🤔',
                  text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
                  text2: 'Coba disesuaikan lagi pencarian kamu',
                  text2Style: {fontFamily: 'Raleway-Regular'},
                  position: 'bottom',
                });
              } else {
                setData([]);
                DefaultErrorToast();
              }
            });
          }
        });
      }
    }
  }, [refreshing]);

  const initServices = () => {
    GetToken().then(token => {
      if (groupedData.Status.length === 0) {
        GetOrderStatusesAPI(token).then(response => {
          if (response.code === 200) {
            response.data.map(idx => {
              mapStatus[idx.name] = idx.id;
              groupedData.Status.push(idx.name);
            });
            setMapStatus(mapStatus);
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
            setMapPaymentStatus(mapPaymentStatus);
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

  const onRefreshAndReset = useCallback(() => {
    tempData = new Map();
    pageState.onceEffect = true;
    pageState.orderPage = 0;
    pageState.maxPage = 0;
    setPageState(pageState);
    onRefresh();
  });

  const groupDisplayValues = multiSelectedIndex.map(idx => {
    const groupTitle = Object.keys(groupedData)[idx.section];
    return groupedData[groupTitle][idx.row];
  });

  const generateRemainingTime = (remainingTime, remainingTimeDetails) => {
    var result = '';

    if (remainingTime === 0) {
      result = 'Habis';
    } else {
      if (remainingTimeDetails.day > 0) {
        result += `${remainingTimeDetails.day} Hari`;
      }

      if (remainingTimeDetails.hour > 0) {
        result = result !== '' ? result + ' ' : result;
        result += `${remainingTimeDetails.hour} Jam`;
      }

      if (remainingTimeDetails.minute > 0) {
        result = result !== '' ? result + ' ' : result;
        result += `${remainingTimeDetails.minute} Menit`;
      }
    }

    return result;
  };

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
            <Text category="p2">
              Tenggat Waktu:{' '}
              <Text category="s2">
                {generateRemainingTime(
                  order.remaining_time,
                  order.remaining_time_details,
                )}
              </Text>{' '}
            </Text>
            <Text category="p2">
              Dibuat:{' '}
              <Text category="s2">
                {GenerateTimestampToDate(order.estimated_at)}
              </Text>{' '}
            </Text>
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
          max={new Date('2030-12-01')}
          range={range}
          onSelect={nextRange => setRange(nextRange)}
        />
      </Layout>

      <Layout style={{marginVertical: 4}} />

      <Button status="info" onPress={onRefreshAndReset}>
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
                onRefreshAndReset();
              }}
            />
          }
        />
      </Layout>
    </Layout>
  );
}
