import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {DeviceWidth, DeviceHeigth} from '../Components/config';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Img} from '../LocalVideo/Video';
import {useDispatch, useSelector} from 'react-redux';
import { setAdCount } from '../Redux/Actions';
import Toast from 'react-native-simple-toast';
const Days = ({route, navigation}) => {
  const {getDayWiseExercise, getAdCount} = useSelector(state => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Edata, setEdata] = useState([]);
  const [value, setValue] = useState('1');
  const Dispatch=useDispatch()
  // useEffect(() => {
  //   if (getAdCount % 3 == 0) {
  //     setIsModalVisible(true);
  //     Dispatch(setAdCount(0))
  //   } else {
  //     setIsModalVisible(false);
  //   }
  // }, []);
  useEffect(() => {
    setEdata(getDayWiseExercise?.day_1?.exercises);
  }, []);
  const handleDropDown = day => {
    switch (day) {
      case '1':
        return setEdata(getDayWiseExercise?.day_1?.exercises);
      case '2':
        return setEdata(getDayWiseExercise?.day_2?.exercises);
      case '3':
        return setEdata(getDayWiseExercise?.day_3?.exercises);
      case '4':
        return setEdata(getDayWiseExercise?.day_4?.exercises);
      case '5':
        return setEdata(getDayWiseExercise?.day_5?.exercises);
      case '6':
        return setEdata(getDayWiseExercise?.day_6?.exercises);
      case '7':
        return setEdata(getDayWiseExercise?.day_7?.exercises);
      default:
        return setEdata(getDayWiseExercise?.day_1?.exercises);
    }
  };
  const data = [
    {label: 'Day 1', value: '1'},
    {label: 'Day 2', value: '2'},
    {label: 'Day 3', value: '3'},
    {label: 'Day 4', value: '4'},
    {label: 'Day 5', value: '5'},
    {label: 'Day 6', value: '6'},
    {label: 'Day 7', value: '7'},
  ];

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const AdModal = () => {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
           Toast.show('Upgrade to pro or Cancel',Toast.LONG)
          }}>
          <View style={[styles.centeredView,{backgroundColor:'rgba(255,255,255,0.5)'}]}>
            <View style={styles.modalView}>
              <Image
                source={Img.backgound1}
                style={{
                  width: DeviceWidth * 0.79,
                  height: DeviceHeigth * 0.3,
                  overflow: 'hidden',
                  borderRadius: 20,
                  opacity: 0.8,
                }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#D0FD3E',
                  borderRadius: 20,
                  marginVertical: 20,
                }}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text
                  style={{
                    color: '#000',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Upgrade to Pro
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingBottom: 20,
                }}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                Cancel
              </Text>
            </View>
          </View>
        </Modal>
    );
  };
  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
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
          Exercises
        </Text>
        <View></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 20,
        }}>
        <Text style={{color: '#fff', fontSize: 19, fontWeight: 'bold'}}>
          Custom Exercises
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={value}
          value={value}
          onChange={item => {
            setValue(item.value);
            handleDropDown(item.value);
          }}
          renderItem={renderItem}
        />
      </View>
      {Edata.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: '#D0FD3E', fontSize: 20, fontWeight: 'bold'}}>
            Rest day
          </Text>
        </View>
      ) : (
        <View
          style={{
            width: '95%',
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            top: 20,
            marginBottom: DeviceHeigth * 0.2,
          }}>
          <FlatList
            data={Edata}
            horizontal
            renderItem={(item, index) => {
              console.log("item----->",item.item);
              return (
                <TouchableOpacity
                  style={{
                    width: DeviceWidth * 0.7,
                    height: DeviceHeigth * 0.2,
                    margin: 10,
                    borderRadius: 20,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('VideoPlayer', {
                      id: item?.item?.exercise_id,day:value
                    });
                  }}>
                  <ImageBackground
                    source={Img.backgound}
                    style={{
                      width: DeviceWidth * 0.7,
                      height: DeviceHeigth * 0.2,
                      overflow: 'hidden',
                      borderRadius: 20,
                      padding: 20,
                    }}
                    resizeMode="cover">
                    <Text
                      style={{
                        color: '#D0FD3E',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {'Custom Exercise'}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 12,
                        //  alignSelf:'flex-end',
                      }}>{`${item.item?.exercise_id}`}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      {/* <AdModal /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  dropdown: {
    height: 30,
    width: DeviceWidth * 0.23,
    borderColor: '#D0FD3E',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 2,
    shadowColor: '#D0FD3E',
    color: '#D0FD3E',
    backgroundColor: '#D0FD3E',
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'red',
  },
  textItem: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: DeviceWidth * 0.8,
    borderWidth: 2.5,
    borderColor: '#D0FD3E',
    // height: DeviceHeigth * 0.5,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default Days;
