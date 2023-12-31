/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, Layout} from '@ui-kitten/components';
import {Header} from './Header';
import {FormServiceName} from './FormServiceName';
import {FormServiceType} from './FormServiceType';
import {ButtonPackage} from './ButtonPackage';
import {FlashList} from '@shopify/flash-list';
import {RenderItem} from './RenderItem';

export function ManagePackagesScreen(props) {
  const mainContent = () => {
    return (
      <Layout style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
        <FlashList
          data={[1, 2, 3]}
          renderItem={RenderItem(props)}
          estimatedItemSize={10}
        />
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {ButtonPackage()}
      {Header(props)}
      <Layout style={{flex: 1, paddingVertical: 8, paddingHorizontal: 8}}>
        <Card status="success" disabled={true}>
          {FormServiceName(props)}
          <Layout style={{marginVertical: 4}} />
          {FormServiceType(props)}
          <Layout style={{marginVertical: 2}} />
        </Card>

        {mainContent()}
      </Layout>
    </Layout>
  );
}
