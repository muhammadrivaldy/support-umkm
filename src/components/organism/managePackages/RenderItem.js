/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Button, Icon, Layout, ListItem} from '@ui-kitten/components';

export function RenderItem(props) {
  return ({item}) => (
    <ListItem
      title={'item.serviceName'}
      description={`Jasa ini memiliki ${item.totalPackages} paket`}
      disabled={true}
      accessoryLeft={<Icon {...props} name="book-outline" />}
      accessoryRight={() => {
        return (
          <Layout>
            <Button
              size="tiny"
              disabled={item.storeId === 0 ? true : false}
              accessoryLeft={props => <Icon {...props} name="edit-outline" />}
              onPress={() => {
                props.navigation.navigate('ManagePackagesScreen');
              }}
            />
          </Layout>
        );
      }}
    />
  );
}
