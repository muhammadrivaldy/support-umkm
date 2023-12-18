/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Select,
  SelectItem,
  Text,
  Input,
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

const PackageList = [
  {
    name: 'Paket 1 (Rp. 30.000)',
    desc: 'Estimasi waktu pengerjaan 2 hari',
  },
  {
    name: 'Paket 2 (Rp. 25.000)',
    desc: 'Estimasi waktu pengerjaan 3 hari',
  },
];

export function CreateOrderScreen({navigation}) {
  const [selectedServiceName, setSelectedServiceName] = React.useState(0);
  const [selectedPackage, setSelectedPackage] = React.useState(null);

  const showingItem = () => {
    return selectedPackage !== undefined && selectedPackage !== null
      ? PackageList[selectedPackage.row].name
      : null;
  };

  const renderItems = () =>
    PackageList.map(idx => (
      <SelectItem
        key={idx.name}
        title={TextProps => (
          <Layout style={{backgroundColor: 'transparent'}}>
            <Text {...TextProps}>{idx.name}</Text>
            <Text
              category="c2"
              style={{
                marginHorizontal: TextProps.style[1].marginHorizontal,
              }}>
              {idx.desc}
            </Text>
          </Layout>
        )}
      />
    ));

  return (
    <>
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
        </Select>
      </Layout>
    </>
  );
}
