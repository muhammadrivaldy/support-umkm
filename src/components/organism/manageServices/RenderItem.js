/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Button, Icon, Layout, ListItem} from '@ui-kitten/components';

export function RenderItem(props) {
  return ({item}) => (
    <ListItem
      title={item.serviceName}
      description={`Jasa ini memiliki ${item.totalPackages} paket`}
      disabled={true}
      accessoryLeft={<Icon {...props} name="cube-outline" />}
      accessoryRight={() => {
        return (
          <Layout style={{flexDirection: 'row'}}>
            <Button
              size="tiny"
              disabled={item.storeId === 0 ? true : false}
              accessoryLeft={props => <Icon {...props} name="edit-outline" />}
              onPress={() => {
                props.navigation.navigate('ManagePackagesScreen', {
                  serviceId: item.id,
                });
              }}
            />

            <Layout style={{marginHorizontal: 4}} />

            <Button
              size="tiny"
              status="danger"
              // disabled={item.storeId === 0 ? true : false}
              disabled={true}
              accessoryLeft={props => <Icon {...props} name="trash-outline" />}
              onPress={() => {
                props.navigation.navigate('ManagePackagesScreen', {
                  serviceId: item.id,
                });
              }}
            />
          </Layout>
        );
      }}
    />
  );
}
