/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Button, Icon, Layout, ListItem} from '@ui-kitten/components';

export function RenderItem({item}) {
  return (
    <ListItem
      title={item.serviceName}
      description={`Jasa ini memiliki ${item.totalPackages} paket`}
      disabled={true}
      accessoryRight={() => {
        return (
          <Layout>
            <Button
              size="tiny"
              disabled={item.storeId === 0 ? true : false}
              accessoryLeft={props => <Icon {...props} name="edit-outline" />}
            />
          </Layout>
        );
      }}
    />
  );
}
