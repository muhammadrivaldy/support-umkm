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
import {RemoveRefreshToken, RemoveToken} from '../../stores/Storages';

const SmartphoneIcon = props => <Icon {...props} name="smartphone-outline" />;
const ShoppingIcon = props => <Icon {...props} name="shopping-bag-outline" />;
const CubeIcon = props => <Icon {...props} name="cube-outline" />;
const EmailIcon = props => <Icon {...props} name="email-outline" />;
const BookmarkIcon = props => <Icon {...props} name="bookmark-outline" />;
const PeopleIcon = props => <Icon {...props} name="people-outline" />;
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

      <Layout style={{marginHorizontal: 10}}>
        <Menu
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <MenuItem
            disabled={true}
            title="Edit Password"
            accessoryLeft={SmartphoneIcon}
          />
          <MenuGroup
            disabled={true}
            title="Edit Laundry"
            accessoryLeft={ShoppingIcon}>
            <MenuItem title="Nama" accessoryLeft={CorderIcon} />
            <MenuItem title="Logo" disabled={true} accessoryLeft={CorderIcon} />
          </MenuGroup>
          <MenuItem
            title="Jasa & Paket"
            accessoryLeft={CubeIcon}
            onPress={() => {
              navigation.navigate('ManageServicesScreen');
            }}
          />
          <MenuItem
            disabled={true}
            title="Paket Member"
            accessoryLeft={PeopleIcon}
          />
          <MenuItem
            disabled={true}
            title="Masukkan Dari Pelanggan"
            accessoryLeft={BookmarkIcon}
          />
          <MenuItem
            disabled={true}
            title="Kasih Masukkan Untuk Pembuat Aplikasi"
            accessoryLeft={EmailIcon}
          />
        </Menu>
      </Layout>

      <Layout style={{marginVertical: 8}} />
      <Divider />
      <Layout style={{marginVertical: 8}} />

      <Button
        status="danger"
        onPress={async () => {
          await RemoveToken();
          await RemoveRefreshToken();

          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }}>
        {TextProps => {
          TextProps.style.fontFamily = 'Raleway-Bold';
          TextProps.style.fontWeight = '600';
          return <Text {...TextProps}>Logout</Text>;
        }}
      </Button>
      <Text category="c2" style={{alignSelf: 'center', marginTop: 4}}>
        Versi 1.0.0
      </Text>
    </Layout>
  );
}
