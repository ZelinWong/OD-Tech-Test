import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
  const onChangeUsername = val => setUsername(val);
  const [username, setUsername] = useState('');
  const onChangePassword = val => setPassword(val);
  const [password, setPassword] = useState('');

  const login = async() => {
    console.log(username, password);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://tech-test.od-tech.my/mobile/security/token', requestOptions)
      .then(response => response.json())
      .then(async(result) => {
        if (!!result?.data?.accessToken) {
          try {           
            await AsyncStorage.setItem('accessToken', result.data.accessToken);
            props.navigation.navigate("Home");
          } catch (e) {
            console.log(e);
          }
          
        }
      })
      .catch(error => console.log('error', error));
  };
  return (
    <View>
      <View>
        <Image
          style={styles.Image}
          source={{
            uri: 'https://resources.wobbjobs.com/resized/uploads/jobs-malaysia/company_images/27530/jobs-malaysia-od-technology-1627027504_show.jpeg',
          }}
        />
      </View>
      <View>
        <Text style={styles.HeaderText}>Username</Text>
        <TextInput
          style={styles.container}
          onChangeText={onChangeUsername}></TextInput>
      </View>

      <View>
        <Text style={styles.HeaderText}>Password</Text>
        <TextInput
          style={styles.container}
          secureTextEntry
          onChangeText={onChangePassword}></TextInput>
      </View>

      <TouchableOpacity style={styles.Button} onPress={login}>
        <Text style={styles.ButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.ButtonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Button: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    borderWidth: 1,
    borderRadius: 35,
    marginTop: 20,
  },

  ButtonText: {
    margin: 20,
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },

  container: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    height: 50,
  },

  HeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    justifyContent: 'center',
    marginBottom: -13,
    marginTop: 10,
  },

  Image: {
    height: 250,
    width: '90%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
});
