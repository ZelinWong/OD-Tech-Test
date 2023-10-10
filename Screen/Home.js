import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);
  const [DataRemainDays, setRemaining] = useState();

  useEffect(() => {
    const calculateRemainingDays = (effectiveDate, expiryDate) => {
      const exD = new Date(expiryDate);
      const efD = new Date(effectiveDate);
      const remainingDays = Math.floor((exD - efD) / (1000 * 60 * 60 * 24));
      return remainingDays;
    };
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log(token);
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

                setRemaining(internetBalance);
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
      <ScrollView>
        <View style={styles.Header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.HeaderText}>Good Morning !</Text>

            <View>
              <TouchableOpacity style={styles.HeaderText}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/0/191.png',
                  }}></Image>
                <Text style={{color: 'white', fontSize: 18, marginTop: 10}}>
                  012345678
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.SecondHeader}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: 'white'}}>Balance</Text>
              <Text style={styles.WalletAmount}>RM {data.credit.amount}</Text>
            </View>

            <TouchableOpacity style={styles.ReloadBtn}>
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
              <Text style={{color: 'white'}}>See rewards </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <View style={styles.MissionHeader}>
                <Image
                  style={styles.MidLogo}
                  source={require('C:/Users/User/AwesomeProject/Assets/Mountain.png')}></Image>
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <Text style={styles.MissionText1}>2 missions completed</Text>

                  <Text style={styles.MissionText2}>
                    Complete more to get rewarded
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View style={styles.Panel}>
            <View style={styles.PanelHeader}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={styles.WifiLogo}
                  source={require('C:/Users/User/AwesomeProject/Assets/Globe.png')}></Image>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Internet
                </Text>
              </View>
              <TouchableOpacity style={styles.BuyMoreBtn}>
                <View>
                  <Text style={styles.PanelText}>BUY MORE</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.PanelComponenet}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 10
                    }}>
                    {data.balances[0].name}
                  </Text>

                  <Text style={{fontSize: 12, marginRight: 10}}>{data.balances[0].description}</Text>
                </View>
                <Text style={{marginLeft: 10}}>{DataRemainDays} days left</Text>
              </View>

              <View style={styles.PanelComponenet}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 10
                    }}>
                    {data.balances[1].name}
                  </Text>

                  <Text style={{fontSize: 12, marginRight: 10}}>{data.balances[1].description}</Text>
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
                <Image
                  style={styles.WifiLogo}
                  source={require('C:/Users/User/AwesomeProject/Assets/Globe.png')}></Image>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Voice
                </Text>
              </View>
              <TouchableOpacity style={styles.BuyMoreBtn}>
                <View>
                  <Text style={styles.PanelText}>BUY MORE</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.PanelComponenet}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 10
                    }}>
                    {data.balances[2].name}
                  </Text>

                  <Text style={{fontSize: 12, marginRight: 10}}>{data.balances[2].initialAmount} mins calls</Text>
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

    justifyContent: 'center',
    height: 80,
    width: '90%',
    alignItems: 'center',
    marginTop: -30,
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
  },

  PanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 12
  },

  PanelText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold'
  },

  PanelComponenet: {
    width: '100%',
    backgroundColor: 'white',
    height: 80,
    alignSelf: 'center',
    marginTop: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    marginLeft: -30
  },

  WifiLogo: {
    height: 30,
    width: 30,
    marginLeft: -30,
    marginRight: 10
  }
});
