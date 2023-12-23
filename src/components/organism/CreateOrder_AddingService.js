/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useReducer} from 'react';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {GetLaundryInfo, GetToken} from '../../stores/Storages';
import {
  GetPackagesByServiceIdAndStoreIdAPI,
  GetServicesByStoreIdAPI,
} from '../../stores/Services';
import Toast from 'react-native-toast-message';
import {
  CustomPrice,
  StaticPriceXPieces,
  StaticPriceXSquareMeter,
  StaticPriceXWeight,
} from '../../models/Price_Types';
import {InitialReducer, TasksReducer} from '../../stores/Reducers';
import {UUID} from 'uuidjs';

export function CreateOrder_AddingServiceScreen({navigation}) {
  const [selectedServiceName, setSelectedServiceName] = React.useState(null);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [services, setServices] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [priceType, setPriceType] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [tasks, dispatch] = useReducer(TasksReducer, InitialReducer);

  const backIcon = props => <Icon {...props} name="arrow-back" />;

  const backAction = () => {
    return () => (
      <TopNavigationAction
        icon={backIcon}
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const initServices = () => {
    if (services.length === 0) {
      GetToken().then(async token => {
        await GetLaundryInfo().then(async responseLaundryInfo => {
          await GetServicesByStoreIdAPI(token, responseLaundryInfo.id).then(
            responseServices => {
              if (responseServices.code === 200) {
                setServices(responseServices.data);
              }
            },
          );
        });
      });
    }
  };

  initServices();

  const initPackages = serviceId => {
    GetToken().then(async token => {
      await GetLaundryInfo().then(async responseLaundryInfo => {
        await GetPackagesByServiceIdAndStoreIdAPI(
          token,
          serviceId,
          responseLaundryInfo.id,
        ).then(responseServices => {
          if (responseServices.code === 200) {
            if (responseServices.data.packages.length > 0) {
              setPackages(responseServices.data.packages);
            } else {
              Toast.show({
                type: 'error',
                text1:
                  'Jasa "' +
                  responseServices.data.service_name +
                  '" belum punya paket',
                text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
                text2: 'Coba tambahin dulu paket-paket nya di menu profile',
                text2Style: {fontFamily: 'Raleway-Regular'},
                position: 'bottom',
              });
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Maaf, terjadi kesalahan 😭',
              text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
              text2: 'Silahkan hubungi kami untuk menanyakan masalah anda',
              text2Style: {fontFamily: 'Raleway-Regular'},
              position: 'bottom',
            });
          }
        });
      });
    });
  };

  const validateBeforeSubmit = () => {
    if (selectedServiceName !== null) {
      if (selectedPackage !== null) {
        if (quantity > 0) {
          if (description !== '') {
            return true;
          }
        }
      }
    }

    return false;
  };

  return (
    <Layout style={{flex: 1}}>
      <TopNavigation
        title="Tambah Jasa"
        accessoryLeft={backAction(navigation)}
        navigation={navigation}
      />

      <Divider />

      <Layout style={{marginVertical: 4}} />

      <Layout
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}>
        <Select
          placeholder={'Pilih service'}
          label={TextProps => {
            TextProps.style[1].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Jasa
              </Text>
            );
          }}
          value={
            selectedServiceName !== null
              ? services[selectedServiceName.row].string
              : null
          }
          selectedIndex={selectedServiceName}
          onSelect={index => setSelectedServiceName(index)}>
          {services.map(idx => (
            <SelectItem
              title={idx.string}
              key={idx.id}
              onPressOut={() => {
                setSelectedPackage(null);
                setPriceType(idx.price_type);
                initPackages(idx.id);
              }}
            />
          ))}
        </Select>

        <Layout style={{marginVertical: 4}} />

        <Select
          placeholder={'Pilih paket nya'}
          label={TextProps => {
            TextProps.style[1].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Paket
              </Text>
            );
          }}
          value={
            selectedPackage !== null ? packages[selectedPackage.row].name : null
          }
          selectedIndex={selectedPackage}
          onSelect={index => setSelectedPackage(index)}>
          {packages.map(idx => (
            <SelectItem title={idx.name} key={idx.id} />
          ))}
        </Select>

        <Layout style={{marginVertical: 4}} />

        <Input
          placeholder="Masukkan ukuran order"
          inputMode="decimal"
          onChangeText={text => setQuantity(text)}
          label={TextProps => {
            TextProps.style[0].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Ukuran
              </Text>
            );
          }}
          accessoryRight={() => {
            return (
              <Layout
                style={{
                  borderWidth: 0,
                  minWidth: 40,
                  backgroundColor: 'transparent',
                }}>
                <Text category="s2" style={{textAlign: 'center'}}>
                  {priceType === StaticPriceXPieces
                    ? 'pcs'
                    : priceType === StaticPriceXWeight
                    ? 'Kg'
                    : priceType === CustomPrice
                    ? 'Rp'
                    : priceType === StaticPriceXSquareMeter
                    ? 'M²'
                    : null}
                </Text>
              </Layout>
            );
          }}
        />

        <Layout style={{marginVertical: 4}} />

        <Input
          multiline={true}
          placeholder="Masukkan detail order"
          textStyle={{minHeight: 100}}
          onChangeText={text => setDescription(text)}
          label={TextProps => {
            TextProps.style[0].fontWeight = '600';
            return (
              <Text category="s1" {...TextProps}>
                Deskripsi
              </Text>
            );
          }}
        />
      </Layout>

      <Button
        style={{
          marginHorizontal: 8,
          marginBottom: 8,
        }}
        onPress={() => {
          if (!validateBeforeSubmit()) {
            Toast.show({
              type: 'error',
              text1: 'Lengkapi dulu dong 😡',
              text1Style: {fontFamily: 'Raleway-Bold', fontWeight: '600'},
              text2: 'Tolong isi jasa, paket, ukuran, dan deskripsi',
              text2Style: {fontFamily: 'Raleway-Regular'},
              position: 'bottom',
            });
          } else {
            dispatch({
              type: 'added',
              id: UUID.generate(),
              serviceName: services[selectedServiceName.row].string,
              package: packages[selectedPackage.row].name,
              estimation: packages[selectedPackage.row].estimation_in_string,
              totalPrice: packages[selectedPackage.row].price, // this is the wrong implementation, will update later
            });

            navigation.goBack();
          }
        }}>
        {TextProps => {
          TextProps.style.fontFamily = 'Raleway-Bold';
          TextProps.style.fontWeight = '600';
          return <Text {...TextProps}>Tambahkan Jasa</Text>;
        }}
      </Button>
    </Layout>
  );
}
