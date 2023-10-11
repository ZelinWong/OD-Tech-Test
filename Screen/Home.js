import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);
  const [DataRemainDays, setRemaining] = useState();
  const [dataRemainPerc, setDataPerc] = useState();
  const [HighSpeedRemainPerc, setHighSpeedRemainPerc] = useState();
  const [VCRemainPerc, setVCPerc] = useState();

  useEffect(() => {
    const calculateRemainingDays = (effectiveDate, expiryDate) => {
      const exD = new Date(expiryDate);
      const efD = new Date(effectiveDate);

      const remainingDays = Math.floor((exD - efD) / (1000 * 60 * 60 * 24));
      return remainingDays;
    };

    const calculateRemainingHighSpeed = (initialAmount, remainingAmount) => {
      const initHighSpeed = initialAmount;
      const remainingHighSpeed = remainingAmount;
      const remainingHighSpeedAmount = remainingHighSpeed / initHighSpeed;
      console.log(initHighSpeed, 'initial High Speed');
      console.log(remainingHighSpeed, 'remaining High Speed');
      console.log(remainingHighSpeedAmount, 'Remaining Amount');
      return remainingHighSpeedAmount;
    };

    const calculateRemainingVC = (initialAmount, remainingAmount) => {
      const initVC = initialAmount;
      const remainingVC = remainingAmount;

      const remainingVCAmount = remainingVC / initVC;
      return remainingVCAmount;
    };

    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log(dataRemainPerc);
        if (token !== null) {
          const myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${token}`);

          const raw = '';

          const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(
            'https://tech-test.od-tech.my/mobile/profile/me',
            requestOptions,
          )
            .then(response => response.json())
            .then(result => {
              if (result.code == 200) {
                const internetBalance = calculateRemainingDays(
                  result.data.balances[0].effectiveDate,
                  result.data.balances[0].expiryDate,
                );

                const HighSpeedBalance = calculateRemainingHighSpeed(
                  result.data.balances[1].initialAmount,
                  result.data.balances[1].remainingAmount,
                );

                const VCBalance = calculateRemainingVC(
                  result.data.balances[2].initialAmount,
                  result.data.balances[2].remainingAmount,
                );

                setRemaining(internetBalance);
                setDataPerc(internetBalance);
                console.log(1234);
                console.log(HighSpeedBalance);
                setHighSpeedRemainPerc(HighSpeedBalance);
                setVCPerc(VCBalance);
                setData(result.data);
                setLoading(false);
              }
            })
            .catch(error => console.log('error', error));
        }
      } catch (e) {}
    };
    getAccessToken();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.Header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.HeaderText}>Good Morning !</Text>

            <View>
              <TouchableOpacity style={styles.HeaderText}>
                <MaterialCommunityIcons
                  name="cellphone"
                  size={25}
                  color={'white'}
                  marginBottom={-10}
                  marginRight={5}
                />
                <Text style={{color: 'white', fontSize: 18, marginTop: 10}}>
                  0123456789
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={25}
                  color={'white'}
                  marginBottom={-10}
                  marginLeft={5}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.SecondHeader}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: 'white'}}>Balance</Text>
              <Text style={styles.WalletAmount}>RM {data.credit.amount}</Text>
            </View>

            <TouchableOpacity style={styles.ReloadBtn} activeOpacity={0.8}>
              <Text style={styles.ReloadText}>RELOAD</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ThirdHeader}>
            <TouchableOpacity
              style={{marginLeft: 5, marginRight: 5, flexDirection: 'row'}}>
              <Image
                style={styles.tinyLogo}
                source={require('C:/Users/User/AwesomeProject/Assets/Star.png')}></Image>
              <Text style={{color: 'white'}}>Gold</Text>
            </TouchableOpacity>

            <Text style={{color: 'white', marginLeft: 5, marginRight: 5}}>
              |
            </Text>

            <TouchableOpacity style={{marginLeft: 5, marginRight: 5}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white'}}>See rewards </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={25}
                  color={'white'}
                  marginTop={-2}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <View style={{alignItems: 'center'}}>
            <TouchableWithoutFeedback style={{flexDirection: 'row'}}>
              <View style={styles.MissionHeader}>
                <Image
                  style={styles.MidLogo}
                  source={require('C:/Users/User/AwesomeProject/Assets/Mountain.png')}></Image>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.MissionText1}>2 missions completed</Text>

                  <Text style={styles.MissionText2}>
                    Complete more to get rewarded
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={25}
                  color={'orange'}
                  
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View style={styles.Panel}>
            <View style={styles.PanelHeader}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="globe-outline" color={'#0E86D4'} size={33} marginLeft={-30} marginRight={10}/>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Internet
                </Text>
              </View>
              <TouchableOpacity style={styles.BuyMoreBtn} activeOpacity={0.8}>
                <View>
                  <Text style={styles.PanelText}>BUY MORE</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.PanelComponenet1}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    {data.balances[0].name}
                  </Text>

                  <Text style={{fontSize: 12, marginRight: 10}}>
                    {data.balances[0].description}
                  </Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Progress.Bar progress={dataRemainPerc} width={330} />
                </View>
                <Text style={{marginLeft: 10}}>{DataRemainDays} days left</Text>
              </View>

              <View style={styles.PanelComponenet2}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    {data.balances[1].name}
                  </Text>

                  <Text style={{fontSize: 12, marginRight: 10}}>
                    {data.balances[1].description}
                  </Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Progress.Bar progress={HighSpeedRemainPerc} width={330} />
                </View>
                <Text style={{marginLeft: 10, color: 'red'}}>
                  {data.balances[1].remainingAmount} MB Left
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View style={styles.Panel}>
            <View style={styles.PanelHeader}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="globe-outline" color={'#0E86D4'} size={33} marginLeft={-30} marginRight={10}/>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Voice
                </Text>
              </View>
              <TouchableOpacity style={styles.BuyMoreBtn} activeOpacity={0.8}>
                <View>
                  <Text style={styles.PanelText}>BUY MORE</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.PanelComponenet2}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    {data.balances[2].name}
                  </Text>

                  <Text style={{fontSize: 12, marginRight: 10}}>
                    {data.balances[2].initialAmount} mins calls
                  </Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Progress.Bar progress={VCRemainPerc} width={330} />
                </View>
                <Text style={{marginLeft: 10}}>
                  {data.balances[2].remainingAmount} mins left
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
  Header: {
    height: 220,
    width: '100%',
    backgroundColor: '#0E86D4',
    flexDirection: 'column',
    padding: 20,
  },

  HeaderText: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  SecondHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center'
  },

  ThirdHeader: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-start',
  },

  WalletAmount: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },

  ReloadBtn: {
    width: 100,
    height: 33,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 10,
  },

  ReloadText: {
    color: 'orange',
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  MissionHeader: {
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: 'white',
    alignSelf: 'center',

    justifyContent: 'space-around',
    height: 80,
    width: '90%',
    alignItems: 'center',
    marginTop: -30,
    elevation: 4,
    borderColor: '#E9EAEC',
    borderWidth: 2,
  },

  MissionText1: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  MissionText2: {
    fontSize: 15,
  },

  BuyMoreBtn: {
    backgroundColor: '#0E86D4',
    borderRadius: 15,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginRight: -50,
  },

  Panel: {
    backgroundColor: '#E9EAEC',
    width: '90%',
    marginTop: 20,
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 2,
    borderColor: '#E9EAEC',
    borderWidth: 2,
  },

  PanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 12,
  },

  PanelText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },

  PanelComponenet1: {
    width: '100%',
    backgroundColor: 'white',
    height: 80,
    alignSelf: 'center',
    marginTop: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  PanelComponenet2: {
    width: '100%',
    backgroundColor: 'white',
    height: 80,
    alignSelf: 'center',
    marginTop: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  tinyLogo: {
    height: 20,
    width: 20,
    marginBottom: -8,
    marginRight: 8,
  },

  MidLogo: {
    height: 50,
    width: 50,

  },

  WifiLogo: {
    height: 30,
    width: 30,
    marginLeft: -30,
    marginRight: 10,
  },
});
