import React from 'react';
import {ListItem} from '@ui-kitten/components';

export function RenderItem({item}) {
  return (
    <ListItem
      title={item.serviceName}
      description={`Jasa ini memiliki ${item.totalPackages} paket`}
    />
  );
}
