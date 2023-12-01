import React from 'react';
import MapView from 'react-native-maps';
import {Dimensions} from 'react-native';

export function MapsScreen({navigation}) {
  return (
    <MapView
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
    />
  );
}
