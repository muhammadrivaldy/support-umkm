/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Avatar,
  Button,
  Icon,
  Layout,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const SmartphoneIcon = props => <Icon {...props} name="smartphone-outline" />;
const ShoppingIcon = props => <Icon {...props} name="shopping-bag-outline" />;
const CubeIcon = props => <Icon {...props} name="cube-outline" />;
const CorderIcon = props => (
  <Icon {...props} name="corner-down-right-outline" />
);

export function ProfileScreen({navigation}) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Layout
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <Layout
        style={{
          flexDirection: 'row',
          marginLeft: 15,
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Avatar size="giant" source={require('../../assets/profile.png')} />

        <Layout style={{marginLeft: 10, flex: 1, marginTop: -4}}>
          <Text category="h6">Muhammad Rivaldy</Text>
          <Text category="c2">muhammadrivaldy16@gmail.com</Text>
          <Text category="c2">0877827312831</Text>
        </Layout>
      </Layout>

      <Layout style={{marginVertical: 16}} />

      <Layout>
        <Menu
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <MenuItem title="Edit Password" accessoryLeft={SmartphoneIcon} />
          <MenuGroup title="Edit Laundry" accessoryLeft={ShoppingIcon}>
            <MenuItem title="Nama" accessoryLeft={CorderIcon} />
            <MenuItem title="Logo" disabled={true} accessoryLeft={CorderIcon} />
          </MenuGroup>
          <MenuGroup title="Paket Member" accessoryLeft={CubeIcon}>
            <MenuItem title="Buat Baru" accessoryLeft={CorderIcon} />
            <MenuItem title="List" accessoryLeft={CorderIcon} />
          </MenuGroup>
        </Menu>
      </Layout>

      <Layout style={{marginVertical: 18}} />

      <Button status="danger">Logout</Button>
      <Text category="c2" style={{alignSelf: 'center', marginTop: 4}}>
        Versi 1.0.0
      </Text>
    </Layout>
  );
}
