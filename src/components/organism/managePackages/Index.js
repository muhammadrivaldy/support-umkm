/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Layout} from '@ui-kitten/components';
import {Header} from './Header';
import {FormServiceName} from './FormServiceName';
import {FormServiceType} from './FormServiceType';

export function ManagePackagesScreen(props) {
  const mainContent = () => {
    return (
      <Layout style={{flex: 1, paddingVertical: 4, paddingHorizontal: 8}}>
        {FormServiceName(props)}
        <Layout style={{marginVertical: 4}} />
        {FormServiceType(props)}
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {Header(props)}
      {mainContent()}
    </Layout>
  );
}
