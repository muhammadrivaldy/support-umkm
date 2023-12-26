/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
// import React, {useReducer} from 'react';
import React, {useEffect} from 'react';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Text,
  ListItem,
  List,
  Button,
  Card,
} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {
  SelectCreateOrderItems,
  deleteItem,
} from '../../stores/redux/CreateOrderItems';

export function CreateOrderScreen({route, navigation}) {
  const {id, name, phoneNumber, address} = route.params;
  const items = useSelector(SelectCreateOrderItems);
  const dispatch = useDispatch();
  const [disablePayment, setDisablePayment] = React.useState(true);

  const backIcon = props => <Icon {...props} name="arrow-back" />;
  const trashIcon = props => <Icon {...props} name="trash-outline" />;

  useEffect(() => {
    if (items) {
      if (items.length > 0) {
        return setDisablePayment(false);
      }
    }

    setDisablePayment(true);
  }, [items]);

  const backAction = () => (
    <TopNavigationAction
      icon={backIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const deleteAction = itemId => {
    return () => (
      <Button
        status="danger"
        size="tiny"
        accessoryRight={trashIcon}
        onPress={() => {
          dispatch(deleteItem(itemId));
        }}
      />
    );
  };

  const packageItems = ({item, index}) => (
    <ListItem
      title={item.serviceName}
      description={TextProps => (
        <>
          <Text category="s1" {...TextProps}>
            {item.packageName}
          </Text>
          <Text category="s1" {...TextProps}>
            Estimasi pengerjaan {item.estimation}
          </Text>
          <Text category="s1" {...TextProps}>
            Harga total Rp. {item.totalPrice}
          </Text>
        </>
      )}
      accessoryRight={deleteAction(item.id)}
    />
  );

  return (
    <Layout style={{flex: 1}}>
      <Layout
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          flex: 1,
          zIndex: 1,
          borderRadius: 100,
          flexDirection: 'row',
          marginHorizontal: 20,
        }}>
        <Button
          style={{borderRadius: 100, flex: 1}}
          onPress={() => {
            navigation.navigate('CreateOrder_AddingServiceScreen');
          }}>
          {TextProps => {
            TextProps.style.fontFamily = 'Raleway-Bold';
            TextProps.style.fontWeight = '600';
            return <Text {...TextProps}>Tambah Jasa</Text>;
          }}
        </Button>

        <Layout style={{marginHorizontal: 4}} />

        <Button
          disabled={disablePayment}
          style={{borderRadius: 100, flex: 1}}
          onPress={() => {
            navigation.navigate(
              'CreateOrder_PaymentScreen',
              payloadForPayment(id, name, phoneNumber, address, items),
            );
          }}>
          {TextProps => {
            TextProps.style.fontFamily = 'Raleway-Bold';
            TextProps.style.fontWeight = '600';
            return <Text {...TextProps}>Bayar</Text>;
          }}
        </Button>
      </Layout>

      <TopNavigation
        accessoryLeft={backAction}
        title="Buat Order"
        navigation={navigation}
      />

      <Divider />

      <Layout
        level="1"
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingTop: 4,
        }}>
        <Card status="primary">
          <Layout
            style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="p2">Nama</Text>
              <Text category="s1">{name}</Text>

              <Layout style={{marginVertical: 6}} />

              <Text category="p2">No HP</Text>
              <Text category="s1">{phoneNumber}</Text>
            </Layout>

            <Layout style={{marginHorizontal: 10}} />

            <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
              <Text category="p2">Address</Text>
              <Text category="s1">{address}</Text>
            </Layout>
          </Layout>
        </Card>

        <Layout style={{marginVertical: 4}} />

        <Layout style={{flex: 1}}>
          <List
            data={items}
            renderItem={packageItems}
            style={{backgroundColor: 'white'}}
            ItemSeparatorComponent={Divider}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}

function payloadForPayment(userId, name, phoneNumber, address, items) {
  let totalPayment = 0;
  let packages = [];

  items.map(idx => {
    totalPayment += Number(idx.totalPrice);
    packages.push({
      packageId: Number(idx.packageId),
      serviceName: idx.serviceName,
      quantity: Number(idx.quantity),
      packagePrice: Number(idx.packagePrice),
      finalPrice: Number(idx.totalPrice),
      member: false,
      note: idx.note,
    });
  });

  return {
    customer: {
      id: userId,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    },
    totalItems: items.length,
    totalPayment: totalPayment,
    packages: packages,
  };
}
