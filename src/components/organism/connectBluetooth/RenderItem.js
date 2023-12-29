/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Icon, ListItem} from '@ui-kitten/components';

export function RenderItem() {
  return (
    <ListItem
      title={'Testing'}
      description={'Your bluetooth testing'}
      accessoryLeft={props => <Icon {...props} name={'person'} />}
    />
  );
}
