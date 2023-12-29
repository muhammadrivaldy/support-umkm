/* eslint-disable react/self-closing-comp */
import React from 'react';
import {List} from '@ui-kitten/components';
import {RenderItem} from './RenderItem';

export function ConnectBluetoothScreen() {
  return <List renderItem={RenderItem}></List>;
}
