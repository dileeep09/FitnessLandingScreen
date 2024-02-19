
import React, {useEffect, useRef, useState} from 'react';
import { Animated,Platform,View } from 'react-native';
import { DeviceWidth,DeviceHeigth } from './config';
const IntroProgressBar=({INDEX})=>{
     const IntroductionData = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];
    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressBarWidth = progressAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'extend',
    });
    useEffect(() => {
      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    }, [progressAnimation]);
    return(
        <View
        style={{
          width: DeviceWidth * 0.1,
          justifyContent: 'center',
          flexDirection: 'row',
          height:Platform.OS=='ios'? 0: DeviceHeigth*0.09,
        }}>
        {IntroductionData.map((value, index) => (
          <View
            key={index}
            style={{
              height: 5,
              marginBottom:DeviceHeigth*0.5,
              marginHorizontal: 4, ///used as masking for the progress bar
              width: index == INDEX ? 60 : 40,
              backgroundColor: 'grey',
            }}>
            <Animated.View
              style={{
                height: 5,
                width: index == INDEX? progressBarWidth : 40,
                backgroundColor:
                  index == INDEX ? "#D0FD3E" : "grey",
              }}></Animated.View>
          </View>
        ))}
      </View>
    )
}
export default IntroProgressBar;