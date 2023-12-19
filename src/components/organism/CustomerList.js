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
} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const data = new Array(18).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const SearchIcon = props => <Icon {...props} name="search-outline" />;
const PlusIcon = props => <Icon {...props} name="plus-outline" />;

export function CustomerListScreen({navigation}) {
  const renderItemAccessory = () => (
    <Button size="tiny" status="danger">
      Hapus
    </Button>
  );

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`087787231231
Jl. Address`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

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
          style={{flex: 1, marginRight: 8}}
        />

        <Button status="info" size="small">
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
          style={{backgroundColor: 'white'}}
          ItemSeparatorComponent={Divider}
        />
      </Layout>
    </Layout>
  );
}
