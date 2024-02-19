import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Img} from '../LocalVideo/Video';
const Splash = ({navigation}) => {
  const {getIntroVisible, getIsLogin} = useSelector(state => state);
  useEffect(() => {
    setTimeout(() => {
      if (getIntroVisible) {
        if (getIsLogin) {
          navigation.navigate('DrawerNavigation');
        } else {
          navigation.navigate('Login');
        }
      } else {
        navigation.navigate('Introduction1');
      }
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Image
        source={Img.logo}
        style={{height: 100, width: 100, marginBottom: 20}}
        resizeMode="contain"
      />
      <Image
        source={Img.title}
        style={{height: 120, width: 400}}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Splash;
