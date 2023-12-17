/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Button,
  Card,
  Datepicker,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  Select,
  SelectGroup,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {Dimensions, View} from 'react-native';

const data = [
  {
    name: 'Muhammad Rivaldy',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'August Dila Ardhelisa',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'Muhammad Rivaldy',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'August Dila Ardhelisa',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'Muhammad Rivaldy',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
  {
    name: 'August Dila Ardhelisa',
    phone: '0877823712388',
    status: 'Selesai',
    payment: 'Lunas',
    deadline: '2 Hari 3 Jam',
    createdAt: '2 Dec 2023',
  },
];

const StarIcon = props => <Icon {...props} name="phone-call-outline" />;
const SearchIcon = props => <Icon {...props} name="search-outline" />;

const groupedData = {
  Status: [
    'Menunggu',
    'Sedang Dikerjakan',
    'Siap Diambil',
    'Selesai',
    'Dibatalkan',
  ],
  Pembayaran: ['Belum Bayar', 'DP', 'Lunas'],
};

export function OrderListScreen({navigation}) {
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [date, setDate] = React.useState();

  const groupDisplayValues = multiSelectedIndex.map(index => {
    const groupTitle = Object.keys(groupedData)[index.section];
    return groupedData[groupTitle][index.row];
  });

  const renderOption = title => <SelectItem title={title} key={title} />;

  const renderGroup = title => (
    <SelectGroup title={title} key={title}>
      {groupedData[title].map(renderOption)}
    </SelectGroup>
  );

  return (
    <Layout
      level="2"
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <Layout style={{marginVertical: 4}} />

      <Input
        placeholder="Nama, No hp, Alamat ..."
        accessoryRight={SearchIcon}
        style={{backgroundColor: 'white'}}
      />

      <Layout style={{marginVertical: 4}} />

      <Layout style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
        <Select
          children={{}}
          style={{flex: 1, marginRight: 3}}
          multiSelect={true}
          placeholder="Filter pencarian kamu disini"
          value={groupDisplayValues.join(', ')}
          selectedIndex={multiSelectedIndex}
          onSelect={index => setMultiSelectedIndex(index)}>
          {Object.keys(groupedData).map(renderGroup)}
        </Select>

        <Datepicker
          style={{flex: 1, marginLeft: 3}}
          date={date}
          onSelect={nextDate => setDate(nextDate)}
        />
      </Layout>

      <Layout style={{marginVertical: 4}} />

      <Button status="primary">Cari</Button>

      <Layout style={{marginVertical: 12}} />

      <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
        <List
          data={data}
          style={{backgroundColor: 'transparent'}}
          renderItem={info => (
            <Card style={{marginBottom: 8}}>
              <Layout
                style={{
                  flexDirection: 'row',
                  alignContent: 'space-around',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}>
                <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
                  <Text category="s1">{info.item.name}</Text>
                  <Text category="p2">{info.item.phone}</Text>
                </Layout>

                <Button
                  status="info"
                  accessoryLeft={StarIcon}
                  style={{maxHeight: 40, maxWidth: 40}}
                />
              </Layout>

              <View style={{marginVertical: 4}} />
              <Divider />
              <View style={{marginVertical: 4}} />

              <Layout
                style={{
                  flexDirection: 'row',
                  alignContent: 'space-around',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}>
                <Layout style={{flex: 1, backgroundColor: 'transparent'}}>
                  <Text category="p2">
                    Status: <Text category="s2">{info.item.status}</Text>{' '}
                  </Text>
                  <Text category="p2">
                    Pembayaran: <Text category="s2">{info.item.payment}</Text>{' '}
                  </Text>
                  <Text category="p2">
                    Tenggat Waktu:{' '}
                    <Text category="s2">{info.item.deadline}</Text>{' '}
                  </Text>
                  <Text category="p2">
                    Dibuat: <Text category="s2">{info.item.createdAt}</Text>{' '}
                  </Text>
                </Layout>

                <Layout style={{backgroundColor: 'transparent'}}>
                  <Button status="primary" size="tiny" disabled={true}>
                    Lunas
                  </Button>
                  <View style={{marginVertical: 4}} />
                  <Button status="primary" size="tiny">
                    Selesai
                  </Button>
                  <View style={{marginVertical: 4}} />
                  <Button status="danger" size="tiny">
                    Batal
                  </Button>
                </Layout>
              </Layout>
            </Card>
          )}
        />
      </Layout>
    </Layout>
  );
}
