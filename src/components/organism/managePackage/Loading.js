/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Layout, Spinner} from '@ui-kitten/components';

export function Loading(props) {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Spinner size="large" />
    </Layout>
  );
}
