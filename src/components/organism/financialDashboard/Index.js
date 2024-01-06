/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Layout, Tab, TabBar, Text} from '@ui-kitten/components';
import {Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {GetLaundryInfo, GetToken} from '../../../stores/Storages';
import {GetStatisticIncomesByStoreIdAPI} from '../../../stores/Services';
import {DefaultErrorToast} from '../../../utils/DefaultToast';
import {Loading} from '../../molecules/Loading';
import {FormattingNumberToMoney} from '../../../utils/Currency';

const screenWidth = Dimensions.get('window').width;

var templateData = {
  labels: [],
  datasets: [
    {
      data: [],
      color: (opacity = 1) => `rgba(2, 100, 184, ${opacity})`,
    },
  ],
};

export function FinancialDashboardScreen(props) {
  const [once, setOnce] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [data, setData] = useState(Object.assign({}, templateData));

  // const testTime = 'years';
  // const testValue = null;

  // const testTime = 'months';
  // const testValue = '2023';

  const testTime = 'days';
  const testValue = '1';

  useState(() => {
    if (once) {
      setOnce(false);
      GetToken().then(token => {
        GetLaundryInfo().then(laundryInfo => {
          GetStatisticIncomesByStoreIdAPI(
            token,
            laundryInfo.id,
            testTime,
            testValue,
          )
            .then(response => {
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
  }, []);

  const lengthBasedOnTime = time => {
    if (time === 'days') {
      return 4;
    } else if (time === 'months') {
      return 5;
    } else if (time === 'years') {
      return 4;
    }
  };

  return (
    <>
      {Loading(loadingVisible, setLoadingVisible)}
      {loadingVisible === false ? (
        <>
          <Layout style={{marginBottom: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <LineChart
                data={data}
                width={
                  (screenWidth * data.labels.length) /
                  lengthBasedOnTime(testTime)
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
                withVerticalLines={true}
                withHorizontalLines={true}
                formatYLabel={text => {
                  return 'Rp. ' + FormattingNumberToMoney(text.split('.')[0]);
                }}
                style={{marginHorizontal: -20, marginTop: 20}}
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

          <Layout>
            <Text>Hello World</Text>
          </Layout>
        </>
      ) : null}
    </>
  );
}
