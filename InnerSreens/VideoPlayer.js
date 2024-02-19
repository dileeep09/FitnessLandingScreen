import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import {VideoUrl} from '../LocalVideo/Video';
import {DeviceHeigth, DeviceWidth} from '../Components/config';
import {useDispatch, useSelector} from 'react-redux';
import {setCompletedExer} from '../Redux/Actions';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const VideoPlayer = ({route, navigation}) => {
  const {id, day} = route?.params;
  const Dispatch = useDispatch();
  const {getCompletedExercise} = useSelector(state => state);
  const handleVideoEnd = () => {
    // Navigate back when the video ends
    const dayKey = `day_${day}`;
    // Get the current array of IDs for the day key or an empty array if it doesn't exist yet
    const currentIds = getCompletedExercise[dayKey] || [];
    // Update the array with the new ID if it's not already included
    const updatedIds = [...new Set([...currentIds, id])];
    const idsObject = {
      ...getCompletedExercise,
      [dayKey]: updatedIds,
    };
    Dispatch(setCompletedExer(idsObject));
    navigation.navigate('Days');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#2C2C2E'}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: DeviceWidth,
          height: DeviceHeigth * 0.12,
          backgroundColor: '#D0FD3E',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            paddingLeft: 20,
          }}
          onPress={() => navigation.goBack()}>
          <Icons name="arrow-left" size={25} color={'#000'} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 30,
            marginLeft: -20,
          }}>
          Exercise Video
        </Text>
        <View></View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: DeviceHeigth * 0.6,
          height: DeviceWidth * 0.9,
        }}>
        <Video
          source={VideoUrl.Url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.5,
          }}
          muted={true}
          repeat={false}
          resizeMode="cover"
          onEnd={handleVideoEnd}
        />
      </View>
      <View
        style={{
          backgroundColor: '#D0FD3E',
          width: DeviceWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 22,
            fontWeight: 'bold',
            paddingVertical: 10,
          }}>
          Exercise Title
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 16}}>{`Some extra information ${
          id ? id : 0
        }`}</Text>
      </View>
    </SafeAreaView>
  );
};

export default VideoPlayer;
