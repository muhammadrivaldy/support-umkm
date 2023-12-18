/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import {Dimensions} from 'react-native';

const data = new Array(18).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

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
  const renderItemAccessory = () => (
    <Button
      size="tiny"
      status="info"
      onPress={() => {
        navigation.navigate('CreateOrderScreen');
      }}>
      Pilih
    </Button>
  );

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={TextProps => (
        <>
          <Text {...TextProps}>087787231231</Text>
          <Text {...TextProps}>Jl. Address</Text>
        </>
      )}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <>
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
              navigation.navigate('CreateCustomerScreen');
            }}>
            Tambah Pelanggan
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
            style={{flex: 1, marginRight: 8}}
          />

          <Button status="info" size="small">
            Cari
          </Button>
        </Layout>

        <Layout style={{marginVertical: 4}} />

        <Layout style={{flex: 1}}>
          <List
            data={data}
            renderItem={renderItem}
            style={{backgroundColor: 'white'}}
          />
        </Layout>
      </Layout>
    </>
  );
}
