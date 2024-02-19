import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {DeviceHeigth, DeviceWidth} from '../Components/config';
import {useDispatch, useSelector} from 'react-redux';
import { setUserData } from '../Redux/Actions';
const Signup = ({navigation}) => {
    const Dispatch=useDispatch()
  const [Name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const reg = /^[\w.\-]+@[\w.\-]+\.\w{2,4}$/;
  const handleSubmit = () => {
    if (!Name) {
      Alert.alert('Please enter your name');
    } else if (!userName) {
      Alert.alert('Please Enter your email', '');
    } else if (!reg.test(userName)) {
      Alert.alert('Please enter a valid email');
    } else if (!Password) {
      Alert.alert('Please enter your password', '');
    } else {
      Dispatch(setUserData([{'Name':Name,'Email':userName,'password':Password}]))
      setTimeout(()=>{
        navigation.navigate('Login');
      },500)

    }
  };
  return (
    <SafeAreaView style={styles.Container}>
      <Text style={{color: '#000', fontSize: 16}}>Signup Screen</Text>
      <TextInput
        style={styles.input}
        onChangeText={txt => setName(txt)}
        value={Name}
        placeholder="Email"
        placeholderTextColor={'#000'}
      />
      <TextInput
        style={styles.input}
        onChangeText={txt => setUserName(txt)}
        value={userName}
        placeholder="Email"
        placeholderTextColor={'#000'}
      />
      <TextInput
        style={styles.input}
        onChangeText={txt => setPassword(txt)}
        value={Password}
        placeholder="Password"
        placeholderTextColor={'#000'}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          width: DeviceWidth * 0.5,
          height: DeviceHeigth * 0.05,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={()=>{handleSubmit()}}
        >
        <Text style={{color: '#fff', fontSize: 16}}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{color: '#000', marginTop: 20, fontSize: 14}}>
          Already have an account ? Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: DeviceHeigth * 0.04,
    width: DeviceWidth * 0.8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});
export default Signup;
