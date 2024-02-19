import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {DeviceWidth, DeviceHeigth} from '../Components/config';
import {useDispatch, useSelector} from 'react-redux';
const History = ({navigation}) => {
  const {getCompletedExercise} = useSelector(state => state);
  console.log(getCompletedExercise);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#000',
          fontSize: 25,
          marginVertical: 15,
          alignSelf: 'center',
        }}>
        History
      </Text>
      {getCompletedExercise?.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:"#000",fontSize:16}}>No exercise completed</Text>
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
          data={getCompletedExercise}
          renderItem={(item, index) => {
            console.log(item.item.days);
            return (
              <TouchableOpacity
                style={{
                  width: DeviceWidth * 0.9,
                  height: DeviceHeigth * 0.2,
                  margin: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={()=>navigation.navigate('Home')}
               >
                <Text>{'id ' + item?.item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default History;
