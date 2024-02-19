import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {DeviceHeigth, DeviceWidth} from './config';
import IntroProgressBar from './IntroProgressBar';
import {VideoUrl} from '../LocalVideo/Video';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setIntroVisible } from '../Redux/Actions';
const Introductoin2 = ({navigation}) => {
  const [startVisible, setStartVisible] = useState(false);
  const Dispatch = useDispatch();
  const handleStart = () => {
    Dispatch(setIntroVisible(true))
    setTimeout(() => {
      navigation.navigate('Login');
    }, 500);
  };
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY1 = useRef(new Animated.Value(-DeviceHeigth)).current;
  const translateXRight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    showAnimation();
  }, []);
  const showAnimation = () => {
    translateX.setValue(-DeviceWidth);
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: 1,
      delay: 500,
      duration: 2000,
    }).start();
    translateXRight.setValue(DeviceWidth);
    Animated.timing(translateXRight, {
      useNativeDriver: true,
      toValue: 1,
      delay: 500,
      duration: 2000,
    }).start();
    setTimeout(()=>{
      translateY1.setValue(-DeviceHeigth);
      Animated.spring(translateY1, {
        useNativeDriver: true,
        toValue:1,
        friction:3,
        tension:20
      }).start();
    },3000)
  };
  return (
    <View style={{flex: 1, backgroundColor: '#2C2C2E'}}>
      <Video
        source={VideoUrl.Url}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.3,
          height: DeviceHeigth * 0.6,
          borderBottomRightRadius: 150, // Adjust the radius as needed
        }}
        muted={true}
        repeat={true}
        resizeMode="cover"
      />
      <View
        style={{
          top: DeviceHeigth * 0.65,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: '700',
            marginBottom: 10,
            transform: [{translateX: translateX}],
          }}>
          {'ACTION IS THE KEY,'}
        </Animated.Text>
        <Animated.Text
          style={{
            color: '#fff',
            fontSize: 19,
            fontWeight: '600',
            marginBottom: 50,
            textAlign: 'center',
            transform: [{translateX: translateXRight}],
          }}>
          {'TO ALL SUCCESS'}
        </Animated.Text>
        <Animated.View style={{transform:[{translateY:translateY1}]}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#D0FD3E',
              borderRadius: 20,
              marginBottom: 50,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              width:130
            }}
            onPress={()=>{
              handleStart()
            }}
            >
            <Text
              style={{
                color: '#000',
                paddingHorizontal: 9,
                paddingVertical: 5,
                fontSize: 16,
                fontWeight: '700',
              }}>
              {'Start Now'}
            </Text>
            <Icons
              name="play"
              size={25}
              color={'#000'}
            />
          </TouchableOpacity>
        </Animated.View>

        <IntroProgressBar INDEX={1} />
      </View>
    </View>
  );
};

export default Introductoin2;
