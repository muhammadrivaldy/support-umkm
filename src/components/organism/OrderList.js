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
  Modal,
  Radio,
  RadioGroup,
  RangeDatepicker,
  Select,
  SelectGroup,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {Linking, RefreshControl, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {GetToken} from '../../stores/Storages';
import {
  GetOrderPaymentStatusesAPI,
  GetOrderStatusesAPI,
  GetOrdersAPI,
  PatchOrderStatusAPI,
} from '../../stores/Services';
import {GenerateTimestampToDate} from '../../utils/Time';
import {DefaultErrorToast} from '../../utils/DefaultToast';
import Toast from 'react-native-toast-message';
import {
  OrderStatusCanceled,
  OrderStatusCompleted,
  PaymentStatusPaid,
} from '../../models/Const';

const starIcon = props => <Icon {...props} name="phone-call-outline" />;
const searchIcon = props => <Icon {...props} name="search-outline" />;
const plusIcon = props => <Icon {...props} name="plus-outline" />;
const paymentMethods = ['cash', 'transfer'];

var tempData = new Map();

export function OrderListScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [range, setRange] = React.useState({});
  const [search, setSearch] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(true);
  const [mapStatus, setMapStatus] = React.useState(new Map());
  const [visibleUpdatePayment, setVisibleUpdatePayment] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState(0);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [inputNominal, setInputNominal] = React.useState(null);
  const [visibleUpdateOrderStatus, setVisibleUpdateOrderStatus] =
    React.useState(false);
  const [mapPaymentStatus, setMapPaymentStatus] = React.useState(new Map());
  const [groupedData, setGroupedData] = React.useState({
    Status: [],
    Pembayaran: [],
  });
  const [orderData, setOrderData] = React.useState({
    totalPayment: 0,
    paidPayment: 0,
    orderNo: '',
    status: 0,
    statusName: '',
  });
  const [pageState, setPageState] = React.useState({
    onceEffect: true,
    fetch: false,
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

  useEffect(() => {
    if (pageState.onceEffect || pageState.fetch) {
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
              50,
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
                pageState.fetch = false;
                pageState.orderPage = pageState.fetch
                  ? pageState.orderPage
                  : pageState.orderPage + 1;
                pageState.maxPage = response.data.pagination.total_page;

                tempData = new Map();

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

  const onRefreshAndFetch = useCallback(() => {
    pageState.fetch = true;
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
            accessoryLeft={starIcon}
            onPress={() => {
              Linking.openURL(
                `whatsapp://send?text=${textToWhatsApp(
                  order.short_order_no,
                  order.customer_name,
                  order.status_name,
                  order.payment_status_name,
                  order.created_at,
                  order.total_payment,
                )}&phone=${order.customer_phone}`,
              );
            }}
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
            <Button
              status="primary"
              size="tiny"
              disabled={
                order.payment_status === PaymentStatusPaid ? true : false
              }
              onPress={() => {
                orderData.orderNo = order.order_no;
                orderData.paidPayment = order.paid_payment;
                orderData.totalPayment = order.total_payment;
                orderData.status = order.status;
                orderData.statusName = order.status_name;
                setOrderData(orderData);
                setSelectedStatus(null);
                setVisibleUpdatePayment(true);
              }}>
              Bayar
            </Button>
            <View style={{marginVertical: 4}} />
            <Button
              status="primary"
              size="tiny"
              disabled={
                order.status === OrderStatusCompleted ||
                order.status === OrderStatusCanceled
                  ? true
                  : false
              }
              onPress={() => {
                orderData.orderNo = order.order_no;
                orderData.paidPayment = order.paid_payment;
                orderData.totalPayment = order.total_payment;
                orderData.status = order.status;
                orderData.statusName = order.status_name;
                setOrderData(orderData);
                setSelectedStatus(null);
                setVisibleUpdateOrderStatus(true);
              }}>
              Status Order
            </Button>
          </Layout>
        </Layout>
      </Card>
    );
  }, []);

  const patchOrderStatusAPI = async (orderNo, status) => {
    await GetToken().then(async token => {
      await PatchOrderStatusAPI(token, orderNo, status).then(response => {
        if (response.code === 200) {
          setVisibleUpdateOrderStatus(false);
          Toast.show({
            type: 'success',
            text1: 'Berhasil update status order 😄',
            text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
            text2: 'Silahkan cek kembali',
            text2Style: {fontFamily: 'Raleway-Regular'},
            position: 'bottom',
          });
        } else {
          DefaultErrorToast();
        }
      });
    });
  };

  return (
    <Layout
      level="1"
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
      }}>
      {modalOfUpdatePayment(
        visibleUpdatePayment,
        setVisibleUpdatePayment,
        selectedPayment,
        setSelectedPayment,
        orderData,
        inputNominal,
        setInputNominal,
        onRefreshAndReset,
      )}
      {modalOfUpdateOrderStatus(
        visibleUpdateOrderStatus,
        setVisibleUpdateOrderStatus,
        orderData,
        selectedStatus,
        setSelectedStatus,
        groupedData.Status,
        patchOrderStatusAPI,
        mapStatus,
        onRefreshAndFetch,
      )}

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
          accessoryLeft={plusIcon}
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
        accessoryRight={searchIcon}
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
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            pageState.onceEffect = true;
            setPageState(pageState);
            onRefresh();
          }}
          estimatedItemSize={100}
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

function textToWhatsApp(
  orderNo,
  name,
  status,
  paymentStatus,
  createdAt,
  totalPrice,
) {
  return `Nomor order kamu adalah *${orderNo}* atas nama *${name}*

Berikut ini update terbaru dari order kamu
Status: *${status}*
Pembayaran: *${paymentStatus}*
Dibuat: *${GenerateTimestampToDate(createdAt)}*
Biaya: *Rp. ${totalPrice}*

Terima kasih karena sudah mempercayakan laundry kami 😄`;
}

function modalOfUpdatePayment(
  visibleUpdatePayment,
  setVisibleUpdatePayment,
  selectedPayment,
  setSelectedPayment,
  orderData,
  inputNominal,
  setInputNominal,
  onRefreshAndReset,
) {
  return (
    <Modal
      visible={visibleUpdatePayment}
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
      onBackdropPress={() => setVisibleUpdatePayment(false)}>
      <Card disabled={true}>
        <Text category="h6">Update Pembayaran</Text>

        <Layout style={{marginVertical: 6}} />

        <Text>
          Total harga: <Text category="s1">Rp. {orderData.totalPayment}</Text>
        </Text>
        <Text>
          Terbayar: <Text category="s1">Rp. {orderData.paidPayment}</Text>
        </Text>
        <Text>
          Kekurangan:{' '}
          <Text category="s1">
            Rp. {orderData.totalPayment - orderData.paidPayment}
          </Text>
        </Text>

        <Layout style={{marginVertical: 6}} />

        <Divider />

        <Layout style={{marginVertical: 4}} />

        <Text category="s1">Pembayaran melalui</Text>
        <RadioGroup
          style={{flexDirection: 'row'}}
          selectedIndex={selectedPayment}
          onChange={index => setSelectedPayment(index)}>
          <Radio>Cash</Radio>
          <Radio>Transfer</Radio>
        </RadioGroup>

        <Layout style={{marginVertical: 6}} />

        <Input
          placeholder="Input nominal"
          onChangeText={text => setInputNominal(text)}
          accessoryLeft={() => {
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
        <Layout style={{marginVertical: 6}} />

        <Layout style={{flexDirection: 'row'}}>
          <Button style={{flexGrow: 1}} disabled={inputNominal ? false : true}>
            Update
          </Button>
          <Layout style={{marginHorizontal: 6}} />
          <Button
            style={{flexGrow: 1}}
            status="danger"
            onPress={() => setVisibleUpdatePayment(false)}>
            Ga jadi
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
}

function modalOfUpdateOrderStatus(
  visibleUpdateOrderStatus,
  setVisibleUpdateOrderStatus,
  orderData,
  selectedStatus,
  setSelectedStatus,
  orderStatuses,
  patchOrderStatusAPI,
  mapStatus,
  onRefreshAndFetch,
) {
  return (
    <Modal
      visible={visibleUpdateOrderStatus}
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
      onBackdropPress={() => setVisibleUpdateOrderStatus(false)}>
      <Card disabled={true}>
        <Text category="h6">Update Status Order</Text>

        <Layout style={{marginVertical: 6}} />

        <Text>
          Status saat ini: <Text category="s1">{orderData.statusName}</Text>
        </Text>

        <Layout style={{marginVertical: 6}} />

        <Select
          placeholder={'Pilih status nya ...'}
          selectedIndex={selectedStatus}
          value={selectedStatus ? orderStatuses[selectedStatus.row] : null}
          onSelect={index => setSelectedStatus(index)}>
          {orderStatuses.map(val => (
            <SelectItem title={val} key={val} />
          ))}
        </Select>

        <Layout style={{marginVertical: 6}} />

        <Layout style={{flexDirection: 'row'}}>
          <Button
            style={{flexGrow: 1}}
            disabled={selectedStatus ? false : true}
            onPress={async () => {
              await patchOrderStatusAPI(
                orderData.orderNo,
                mapStatus[orderStatuses[selectedStatus.row]],
              );

              onRefreshAndFetch();
            }}>
            Update
          </Button>
          <Layout style={{marginHorizontal: 6}} />
          <Button
            style={{flexGrow: 1}}
            status="danger"
            onPress={() => setVisibleUpdateOrderStatus(false)}>
            Ga jadi
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
}
