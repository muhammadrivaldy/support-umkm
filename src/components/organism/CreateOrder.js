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

export function CreateOrderScreen({navigation}) {
  const [selectedServiceName, setSelectedServiceName] = React.useState(0);
  const [selectedPackage, setSelectedPackage] = React.useState(0);

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
        <Select
          placeholder={'Pilih service'}
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
          onSelect={index => setSelectedPackage(index)}>
          <SelectItem
            title={TextProps => {
              return (
                <Layout style={{backgroundColor: 'transparent'}}>
                  <Text {...TextProps}>Hello</Text>
                  <Text
                    category="c2"
                    style={{
                      marginHorizontal: TextProps.style[1].marginHorizontal,
                    }}>
                    Hello
                  </Text>
                </Layout>
              );
            }}
          />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>
      </Layout>
    </>
  );
}
