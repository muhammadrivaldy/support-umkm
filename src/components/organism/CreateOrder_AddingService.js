/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
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
import {UUID} from 'uuidjs';
import {useDispatch} from 'react-redux';
import {addItem} from '../../stores/redux/CreateOrderItems';

export function CreateOrder_AddingServiceScreen({navigation}) {
  const [selectedServiceName, setSelectedServiceName] = React.useState(null);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [services, setServices] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [priceType, setPriceType] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [disablePackages, setDisablePackages] = React.useState(true);
  const [customServiceName, setCustomServiceName] = React.useState(null);
  const [showInput, setShowInput] = React.useState(false);
  const [showCustomServiceName, setShowCustomServiceName] =
    React.useState(false);

  const dispatch = useDispatch();

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
        if (
          (services[selectedServiceName.row].string === 'Belum Terdaftar' &&
            customServiceName !== null) ||
          services[selectedServiceName.row].string !== 'Belum Terdaftar'
        ) {
          if (quantity > 0) {
            if (description !== '') {
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  const calculateTotalPrice = price => {
    if (
      priceType === StaticPriceXPieces ||
      priceType === StaticPriceXWeight ||
      priceType === StaticPriceXSquareMeter
    ) {
      return price * quantity;
    } else {
      return quantity;
    }
  };

  useEffect(() => {
    setSelectedPackage(null);
    if (services && selectedServiceName) {
      let service = services[selectedServiceName.row];
      setPriceType(service.price_type);
      initPackages(service.id);
      setShowInput(true);
      service.total_packages > 0
        ? setDisablePackages(false)
        : setDisablePackages(true);
      service.string === 'Belum Terdaftar'
        ? setShowCustomServiceName(true)
        : setShowCustomServiceName(false);
    }
  }, [selectedServiceName]);

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
          {services.map(idx => {
            return (
              <SelectItem
                key={idx.id}
                title={props => {
                  return (
                    <Layout
                      style={{
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                      }}>
                      <Text {...props}>{idx.string}</Text>
                      <Text
                        category="p2"
                        style={{
                          marginHorizontal: props.style[1].marginHorizontal,
                        }}>
                        Jasa ini punya {idx.total_packages} paket
                        {' - ' + idx.price_type_name.id}
                      </Text>
                    </Layout>
                  );
                }}
              />
            );
          })}
        </Select>

        {showCustomServiceName ? (
          <>
            <Layout style={{marginVertical: 4}} />

            <Input
              placeholder="Masukkan nama jasa"
              value={customServiceName}
              onChangeText={text => setCustomServiceName(text)}
              label={TextProps => {
                TextProps.style[0].fontWeight = '600';
                return (
                  <Text category="s1" {...TextProps}>
                    Nama Jasa
                  </Text>
                );
              }}
            />
          </>
        ) : null}

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
          onSelect={index => setSelectedPackage(index)}
          disabled={disablePackages}>
          {packages.map(idx => {
            return (
              <SelectItem
                title={props => {
                  return (
                    <Layout
                      style={{
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                      }}>
                      <Text {...props}>{idx.name}</Text>
                      <Text
                        category="p2"
                        style={{
                          marginHorizontal: props.style[1].marginHorizontal,
                        }}>
                        Estimasi pengerjaan {idx.estimation_in_string}
                      </Text>
                    </Layout>
                  );
                }}
                key={idx.id}
              />
            );
          })}
        </Select>

        {showInput ? (
          <>
            <Layout style={{marginVertical: 4}} />

            <Input
              placeholder={placeholderOfQuantity(priceType)}
              inputMode="decimal"
              onChangeText={text => setQuantity(text)}
              label={TextProps => {
                TextProps.style[0].fontWeight = '600';
                return (
                  <Text category="s1" {...TextProps}>
                    {titleOfQuantity(priceType)}
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
                      {iconOfQuantity(priceType)}
                    </Text>
                  </Layout>
                );
              }}
            />
          </>
        ) : null}

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
            var serviceObj = services[selectedServiceName.row];
            var packageObj = packages[selectedPackage.row];

            dispatch(
              addItem({
                id: UUID.generate(),
                serviceName:
                  serviceObj.string === 'Belum Terdaftar'
                    ? customServiceName
                    : serviceObj.string,
                packageId: packageObj.id,
                packageName: packageObj.name,
                packagePrice: packageObj.price,
                note: description,
                estimation: packageObj.estimation_in_string,
                quantity: serviceObj.price_type === CustomPrice ? 1 : quantity,
                totalPrice: calculateTotalPrice(packageObj.price),
              }),
            );

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

function titleOfQuantity(priceType) {
  return priceType === StaticPriceXPieces
    ? 'Jumlah'
    : priceType === StaticPriceXWeight
    ? 'Berat'
    : priceType === CustomPrice
    ? 'Harga'
    : priceType === StaticPriceXSquareMeter
    ? 'Ukuran'
    : null;
}

function placeholderOfQuantity(priceType) {
  return priceType === StaticPriceXPieces
    ? 'Input jumlah disini'
    : priceType === StaticPriceXWeight
    ? 'Input berat disini'
    : priceType === CustomPrice
    ? 'Input harga disini'
    : priceType === StaticPriceXSquareMeter
    ? 'Input lebar disini'
    : null;
}

function iconOfQuantity(priceType) {
  return priceType === StaticPriceXPieces
    ? 'pcs'
    : priceType === StaticPriceXWeight
    ? 'Kg'
    : priceType === CustomPrice
    ? 'Rp'
    : priceType === StaticPriceXSquareMeter
    ? 'M²'
    : null;
}
