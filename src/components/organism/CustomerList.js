/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Icon, Layout, List, ListItem} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const data = new Array(18).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export function CustomerListScreen({navigation}) {
  const renderItemAccessory = () => <Button size="tiny">FOLLOW</Button>;

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`087787231231
Jl. Address`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <Layout
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <List
        data={data}
        renderItem={renderItem}
        style={{backgroundColor: 'white'}}
      />
    </Layout>
  );
}
