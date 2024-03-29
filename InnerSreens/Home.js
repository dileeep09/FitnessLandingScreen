import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DeviceWidth, DeviceHeigth} from '../Components/config';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

import {
  setAdCount,
  setDayWiseExerise,
  setExerciseCount,
  setIsLogin,
} from '../Redux/Actions';
import Days from './Days';
import {
  BannerAds,
  useInterstitialAds,
} from '../Components/Adverts/Interstitial';
import {useRewardedAds} from '../Components/Adverts/Interstitial';
const Home = ({navigation}) => {
  useEffect(() => {
    getWorkoutData();
    initInterstitial();
    initReward();
  }, []);
  const [loaded, setLoaded] = useState(false);
  const [adClosed, setAdClosed] = useState(false);
  const Dispatch = useDispatch();
  const {getUserData, getAdCount, getIsLogin} = useSelector(state => state);
  const [WrokoutData, setWorkoutData] = useState([]);
  const [isLoaded1, setIsLoaded] = useState(false);
  const TIMEOUT = 60 * 1000;
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLogin);
  const [getAdStatus, setAdStatus] = useState(false);
  const [getRewardedAd, setRewardedAd] = useState();

  //interStitial ad
  const {initInterstitial, showInterstitialAd} = useInterstitialAds();
  const {initReward, showRewardedAd} = useRewardedAds();
  const getWorkoutData = async () => {
    try {
      const res = await axios(
        `${'https://gofit.tentoptoday.com/adserver/public/api/popularWorkout/1.8'}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (res) {
        setIsLoaded(true);
        setWorkoutData(res?.data);
        let totalExercises = 0;
        res?.data?.forEach(element => {
          for (const day in element.days)
            totalExercises += element?.days[day]?.exercises?.length ?? 0;
        });
        Dispatch(setExerciseCount(totalExercises));
      }
    } catch (error) {
      console.log('Api Error', error);
      setIsLoaded(true);
      Toast.show('Error while loading the data', Toast.LONG);
    }
  };

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <>
      <View style={styles.Container}>
        <View
          style={{
            marginTop: 80,
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 25,
                paddingLeft: DeviceWidth * 0.08,
                fontWeight: 'bold',
              }}>
              {`Hello ${
                getUserData[0]?.name
                  ? getUserData[0]?.name.split(' ')[0]
                  : 'User'
              } ,`}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#D0FD3E',
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: DeviceWidth * 0.07,
              }}
              onPress={handleOpenDrawer}
              activeOpacity={0.4}>
              <Icons
                name="format-list-bulleted-square"
                size={24}
                color={'#000'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#D0FD3E',
                fontSize: 18,
                paddingLeft: DeviceWidth * 0.08,
                fontWeight: 'bold',
                marginVertical: 20,
              }}>
              {'Workouts for you'}
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              borderRadius: 10,
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: DeviceHeigth * 0.2,
            }}>
            <FlatList
              horizontal
              data={WrokoutData}
              renderItem={(item, index) => {
                // console.log("info--->",item.item);
                return (
                  <TouchableOpacity
                    style={{
                      width: DeviceWidth * 0.7,
                      height: DeviceHeigth * 0.2,
                      margin: 10,
                      borderRadius: 20,
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderColor: '#D0FD3E',
                    }}
                    onPress={() => {
                      Dispatch(setAdCount(getAdCount + 1));
                      Dispatch(setDayWiseExerise(item?.item?.days));
                      console.log('loadded', getAdCount);
                      if (getAdCount % 3 == 0 && getAdCount != 0) {
                        showInterstitialAd(navigation);
                        Dispatch(setAdCount(0));
                      } else {
                        setTimeout(() => {
                          navigation.navigate('Days', {item: item?.item?.days});
                        }, 250);
                      }
                    }}>
                    <ImageBackground
                      source={{uri: item.item.workout_image_link}}
                      style={{height: 100, width: 200}}
                      resizeMode="contain"></ImageBackground>
                    <Text
                      style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
                      {item?.item.workout_title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        {!isLoaded1 ? <ActivityIndicator color={'#D0FD3E'} size={50} /> : null}
        <TouchableOpacity
          style={{
            backgroundColor: '#D0FD3E',
            width: DeviceWidth * 0.7,
            height: DeviceHeigth * 0.05,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginVertical: 30,
            alignSelf: 'center',
          }}
          onPress={() => {
            showRewardedAd(navigation);
          }}>
          <Text style={{color: '#2C2C2E', fontSize: 16, fontWeight: '700'}}>
            Rewarded Ads
          </Text>
        </TouchableOpacity>
      </View>
      <BannerAds />
    </>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  dropdown: {
    margin: 16,
    height: 30,
    width: DeviceWidth * 0.3,
    borderColor: 'red',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    shadowColor: '#000',
    color: '#000',
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
});
export default Home;
