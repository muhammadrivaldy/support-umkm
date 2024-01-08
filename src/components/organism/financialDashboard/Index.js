/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Button,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {FlashList} from '@shopify/flash-list';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {GetStatisticIncomesByStoreIdAPI} from '../../../stores/Services';
import {DefaultErrorToast} from '../../../utils/DefaultToast';
import {Loading} from '../../molecules/Loading';
import {FormattingNumberToMoney} from '../../../utils/Currency';

const screenWidth = Dimensions.get('window').width;
const times = ['years', 'months', 'days'];
const showTimes = ['Tahunan', 'Bulanan', 'Harian'];
const years = [2024, 2023, 2022];
const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export function FinancialDashboardScreen(props) {
  const [once, setOnce] = useState(true);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(2, 100, 184, ${opacity})`,
      },
    ],
  });
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [selectedTime, setSelectedTime] = useState({row: 0});
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    if (once) {
      setOnce(false);
      GetToken().then(token => {
        GetLaundryInfo().then(laundryInfo => {
          GetStatisticIncomesByStoreIdAPI(
            token,
            laundryInfo.id,
            times[selectedTime.row],
            getValue(),
          )
            .then(response => {
              data.labels = [];
              data.datasets[0].data = [];

              response.data.data.statistic.map(value => {
                data.labels.push(value.title);
                data.datasets[0].data.push(String(value.incomes));
              });

              setData(data);
              setLoadingVisible(false);
            })
            .catch(() => {
              DefaultErrorToast();
            });
        });
      });
    }
  }, [once]);

  const getValue = () => {
    let time = times[selectedTime.row];

    if (time === 'years') {
      return null;
    } else if (time === 'months') {
      return years[selectedYear.row];
    } else if (time === 'days') {
      return selectedMonth.row + 1;
    }

    return null;
  };

  const lengthBasedOnTime = time => {
    if (time === 'days') {
      return 5;
    } else if (time === 'months') {
      return 4.8;
    } else if (time === 'years') {
      return 4.4;
    }
  };

  const formYear = () => {
    if (times[selectedTime.row] === 'months') {
      return (
        <Select
          placeholder={'Pilih tahun'}
          style={{marginBottom: 8}}
          value={selectedYear !== null ? years[selectedYear.row] : null}
          onSelect={index => setSelectedYear(index)}>
          {years.map(value => {
            return <SelectItem title={value} key={value} />;
          })}
        </Select>
      );
    }

    return null;
  };

  const formMonth = () => {
    if (times[selectedTime.row] === 'days') {
      return (
        <Select
          placeholder={'Pilih bulan'}
          style={{marginBottom: 8}}
          value={selectedMonth !== null ? months[selectedMonth.row] : null}
          onSelect={index => setSelectedMonth(index)}>
          {months.map(value => {
            return <SelectItem title={value} key={value} />;
          })}
        </Select>
      );
    }

    return null;
  };

  const isButtonDisable = () => {
    let time = times[selectedTime.row];

    if (time === 'years') {
      return false;
    } else if (time === 'months') {
      return selectedYear === null;
    } else if (time === 'days') {
      return selectedMonth === null;
    }

    return true;
  };

  const iconPlus = props => <Icon {...props} name="plus-square-outline" />;

  const listMoney = data => {
    return (
      <ListItem
        disabled={true}
        title={'Rp. ' + FormattingNumberToMoney(data.item)}
        description={TextProps => (
          <>
            <Text {...TextProps}>22 Okt 2023</Text>
            <Text {...TextProps}>Pembayaran cash</Text>
          </>
        )}
        accessoryLeft={iconPlus}
      />
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {Loading(loadingVisible, setLoadingVisible)}
      {loadingVisible === false ? (
        <Layout style={{flex: 1}}>
          <Layout
            style={{paddingHorizontal: 8, paddingTop: 12, paddingBottom: 0}}>
            <Select
              style={{marginBottom: 8}}
              value={showTimes[selectedTime.row]}
              onSelect={index => setSelectedTime(index)}>
              {showTimes.map(value => {
                return <SelectItem title={value} key={value} />;
              })}
            </Select>

            {formYear()}
            {formMonth()}

            <Button
              disabled={isButtonDisable()}
              status="info"
              onPress={() => {
                setLoadingVisible(true);
                setOnce(true);
              }}>
              {TextProps => {
                TextProps.style.fontFamily = 'Raleway-Bold';
                TextProps.style.fontWeight = '600';
                return <Text {...TextProps}>Cari</Text>;
              }}
            </Button>
          </Layout>

          <Layout style={{marginBottom: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <LineChart
                data={data}
                width={
                  (screenWidth * data.labels.length) /
                  lengthBasedOnTime(times[selectedTime.row])
                }
                height={220}
                renderDotContent={({x, y, index}) => {
                  let label = data.labels[index];
                  let nominal = FormattingNumberToMoney(
                    data.datasets[0].data[index],
                  );

                  return (
                    <Layout key={index}>
                      <Layout
                        key={`nominal-${index}`}
                        style={{
                          position: 'absolute',
                          top: y - 28,
                          left: x - 17 - nominal.length * 2.5,
                          backgroundColor: 'white',
                          borderRadius: 4,
                          borderWidth: 1,
                        }}>
                        <Text
                          category="s1"
                          style={{
                            fontSize: 10,
                            marginHorizontal: 6,
                            marginBottom: 3,
                          }}>
                          Rp. {nominal}
                        </Text>
                      </Layout>

                      <Layout
                        key={`label-${index}`}
                        style={{
                          position: 'absolute',
                          top: 190,
                          left: x - label.length * 2.5,
                          backgroundColor: 'transparent',
                        }}>
                        <Text category="s1" style={{fontSize: 10}}>
                          {label}
                        </Text>
                      </Layout>
                    </Layout>
                  );
                }}
                withHorizontalLabels={false}
                withVerticalLabels={false}
                horizontalLabelRotation={300}
                withVerticalLines={false}
                withHorizontalLines={false}
                formatYLabel={text => {
                  return 'Rp. ' + FormattingNumberToMoney(text.split('.')[0]);
                }}
                style={{marginTop: 30, marginRight: 75}}
                chartConfig={{
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                bezier
              />
            </ScrollView>
          </Layout>

          <Layout style={{flex: 1, marginLeft: 20}}>
            <Text category="s2" style={{marginTop: 15, marginBottom: 8}}>
              Daftar Pemasukkan
            </Text>
            <FlashList
              data={[
                10000, 20000, 30000, 24000, 1002300, 34100, 32000, 49100,
                900000, 2000000, 10000, 20000, 30000, 24000, 1002300, 34100,
                32000, 49100, 900000, 2000000,
              ]}
              renderItem={listMoney}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={50}
            />
          </Layout>
        </Layout>
      ) : null}
    </Layout>
  );
}
