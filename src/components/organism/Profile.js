/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Layout,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const SmartphoneIcon = props => <Icon {...props} name="smartphone-outline" />;
const BrowserIcon = props => <Icon {...props} name="browser-outline" />;
const PeopleIcon = props => <Icon {...props} name="people-outline" />;
const AddingIcon = props => <Icon {...props} name="plus-square-outline" />;
const MenuIcon = props => <Icon {...props} name="menu-2-outline" />;

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

      <Layout style={{marginVertical: 8}} />

      <Divider />

      <Layout style={{marginVertical: 8}} />

      <Layout>
        <Menu
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <MenuItem title="Update Password" accessoryLeft={SmartphoneIcon} />
          <MenuGroup title="Manage Paket" accessoryLeft={BrowserIcon}>
            <MenuItem title="Buat Paket Baru" accessoryLeft={AddingIcon} />
            <MenuItem title="List Paket" accessoryLeft={MenuIcon} />
          </MenuGroup>
          <MenuGroup title="Manage Member" accessoryLeft={PeopleIcon}>
            <MenuItem title="Buat Member Baru" accessoryLeft={AddingIcon} />
            <MenuItem title="List Member" accessoryLeft={MenuIcon} />
          </MenuGroup>
        </Menu>
      </Layout>

      <Layout style={{marginVertical: 10}} />

      <Divider />

      <Layout style={{marginVertical: 8}} />

      <Button status="danger">Logout</Button>
      <Text category="c2" style={{alignSelf: 'center', marginTop: 4}}>
        Versi 1.0.0
      </Text>
    </Layout>
  );
}
