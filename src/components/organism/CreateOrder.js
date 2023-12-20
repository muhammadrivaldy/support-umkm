/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

const BackIcon = props => <Icon {...props} name="arrow-back" />;
const TrashIcon = props => <Icon {...props} name="trash-outline" />;

const DeleteAction = () => (
  <Button status="danger" size="tiny" accessoryRight={TrashIcon} />
);

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

const data = new Array(10).fill({
  title: 'Cuci kering setrika',
  package: 'Package 1 (Rp. 24.000/Kg)',
  estimatedTime: 'Estimasi pengerjaan 2 Hari 3 Jam',
  totalPrice: 'Rp. 20.000',
});

const PackageItems = ({item, index}) => (
  <ListItem
    title={item.title}
    description={TextProps => (
      <>
        <Text category="s1" {...TextProps}>
          {item.package}
        </Text>
        <Text category="s1" {...TextProps}>
          {item.estimatedTime}
        </Text>
        <Text category="s1" {...TextProps}>
          Harga total {item.totalPrice}
        </Text>
      </>
    )}
    accessoryRight={DeleteAction}
  />
);

export function CreateOrderScreen({route, navigation}) {
  const {name, phoneNumber, address} = route.params;

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
          style={{borderRadius: 100, flex: 1}}
          onPress={() => {
            navigation.navigate('CreateOrder_PaymentScreen');
          }}>
          {TextProps => {
            TextProps.style.fontFamily = 'Raleway-Bold';
            TextProps.style.fontWeight = '600';
            return <Text {...TextProps}>Bayar</Text>;
          }}
        </Button>
      </Layout>

      <TopNavigation
        accessoryLeft={BackAction(navigation)}
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
            data={data}
            renderItem={PackageItems}
            style={{backgroundColor: 'white'}}
            ItemSeparatorComponent={Divider}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}
