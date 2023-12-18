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
  Input,
  ListItem,
  List,
  Button,
} from '@ui-kitten/components';

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

const data = new Array(10).fill({
  title: 'Cuci kering setrika',
  package: 'Package 1 (Rp. 24.000/Kg)',
  estimatedTime: 'Estimasi pengerjaan 2 Hari 3 Jam',
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
      </>
    )}
  />
);

export function CreateOrderScreen({navigation}) {
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
            navigation.navigate('CreateOrder_CustomerListScreen');
          }}>
          Tambah Jasa
        </Button>

        <Layout style={{marginHorizontal: 4}} />

        <Button
          style={{borderRadius: 100, flex: 1}}
          onPress={() => {
            navigation.navigate('CreateOrder_CustomerListScreen');
          }}>
          Selesai
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
          paddingTop: 8,
        }}>
        <Input
          value="Muhammad Rivaldy"
          disabled={true}
          label={TextProps => {
            TextProps.style[0].color = '#8F9BB3';
            TextProps.style[0].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Nama Pelanggan
              </Text>
            );
          }}
        />

        <Layout style={{marginVertical: 4}} />

        <Input
          value="0877823712319"
          disabled={true}
          label={TextProps => {
            TextProps.style[0].color = '#8F9BB3';
            TextProps.style[0].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                No HP
              </Text>
            );
          }}
        />

        <Layout style={{marginVertical: 4}} />

        <Input
          multiline={true}
          value="Jl. Pedesaan"
          disabled={true}
          textStyle={{minHeight: 80}}
          label={TextProps => {
            TextProps.style[0].color = '#8F9BB3';
            TextProps.style[0].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Alamat
              </Text>
            );
          }}
        />

        <Layout style={{marginVertical: 4}} />

        <Layout style={{flex: 1}}>
          <List
            data={data}
            renderItem={PackageItems}
            style={{backgroundColor: 'white'}}
            ItemSeparatorComponent={Divider}
          />
        </Layout>

        {/* <Layout style={{marginVertical: 4}} />

        <Select
          placeholder={'Pilih service'}
          label={TextProps => {
            TextProps.style[1].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Service
              </Text>
            );
          }}
          selectedIndex={selectedServiceName}
          onSelect={index => setSelectedServiceName(index)}>
          <SelectItem title="Option 1" />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>

        <Layout style={{marginVertical: 4}} />

        <Select
          selectedIndex={selectedPackage}
          placeholder={'Pilih paket nya'}
          label={TextProps => {
            TextProps.style[1].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Paket
              </Text>
            );
          }}
          value={showingItem(selectedPackage)}
          onSelect={index => setSelectedPackage(index)}>
          {renderItems()}
        </Select> */}
      </Layout>
    </Layout>
  );
}
