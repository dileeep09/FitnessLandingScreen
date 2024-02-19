import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Video from 'react-native-video';
import IntroProgressBar from './IntroProgressBar';
import {DeviceHeigth, DeviceWidth} from './config';
import {VideoUrl} from '../LocalVideo/Video';
const Introduction1 = ({navigation}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateXRight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    showAnimation();
    setTimeout(() => {
      navigation.navigate("Introduction2")
    }, 4000);
  }, []);
  const showAnimation = () => {
    translateX.setValue(-DeviceWidth);
    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: 1,
      delay: 500,
      duration: 2000,
    }).start()
    translateXRight.setValue(DeviceWidth);
    Animated.timing(translateXRight, {
      useNativeDriver: true,
      toValue: 1,
      delay: 500,
      duration: 2000,
    }).start()
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
            transform:[{translateX:translateX}]
          }}>
          {'MEET YOUR COACH,'}
        </Animated.Text>
        <Animated.Text
          style={{
            color: '#fff',
            fontSize: 19,
            fontWeight: '600',
            marginBottom: 130,
            textAlign: 'center',
            transform:[{translateX:translateXRight}]
          }}>
          {'START YOUR JOURNEY'}
        </Animated.Text>
        <IntroProgressBar INDEX={0} />
      </View>
    </View>
  );
};

export default Introduction1;
