/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from '@ui-kitten/components';

export const TextH1 = props => {
  return (
    <Text style={{fontFamily: 'Raleway-Bold', fontSize: 34}}>{props.text}</Text>
  );
};
