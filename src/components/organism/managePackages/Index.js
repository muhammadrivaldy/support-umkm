/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, Layout} from '@ui-kitten/components';
import {Header} from './Header';
import {FormServiceName} from './FormServiceName';
import {FormServiceType} from './FormServiceType';
import {ButtonPackage} from './ButtonPacakge';

export function ManagePackagesScreen(props) {
  const mainContent = () => {
    return (
      <Layout style={{flex: 1, paddingVertical: 8, paddingHorizontal: 8}}>
        <Card status="success" disabled={true}>
          {FormServiceName(props)}
          <Layout style={{marginVertical: 4}} />
          {FormServiceType(props)}
          <Layout style={{marginVertical: 6}} />
        </Card>
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {ButtonPackage()}
      {Header(props)}
      {mainContent()}
    </Layout>
  );
}
