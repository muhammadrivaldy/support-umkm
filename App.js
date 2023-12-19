/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Navigation from './src/navigation/Navigation';
import {default as theme} from './src/assets/theme.json';
import {default as mapping} from './src/assets/mapping.json';
import {enableLatestRenderer} from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import {decode, encode} from 'base-64'; // refer to https://stackoverflow.com/questions/42829838/react-native-atob-btoa-not-working-without-remote-js-debugging

function App() {
  enableLatestRenderer();
  requestLocation();

  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{...eva.light, ...theme}}
        customMapping={mapping}>
        <Navigation />
      </ApplicationProvider>
      <Toast />
    </>
  );
}

async function requestLocation() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Cool Photo App Camera Permission',
      message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
}

export default App;
