/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useReducer} from 'react';
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
import {InitialReducer, TasksReducer} from '../../stores/Reducers';

export function CreateOrderScreen({route, navigation}) {
  const {name, phoneNumber, address} = route.params;

  const [tasks, dispatch] = useReducer(TasksReducer, InitialReducer);

  const backIcon = props => <Icon {...props} name="arrow-back" />;
  const trashIcon = props => <Icon {...props} name="trash-outline" />;

  const backAction = () => (
    <TopNavigationAction
      icon={backIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const deleteAction = id => {
    return () => (
      <Button
        status="danger"
        size="tiny"
        accessoryRight={trashIcon}
        onPress={() => {
          dispatch({
            type: 'deleted',
            id: id,
          });
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
            {item.package}
          </Text>
          <Text category="s1" {...TextProps}>
            {item.estimation}
          </Text>
          <Text category="s1" {...TextProps}>
            Harga total {item.totalPrice}
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
            data={tasks}
            renderItem={packageItems}
            style={{backgroundColor: 'white'}}
            ItemSeparatorComponent={Divider}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}
