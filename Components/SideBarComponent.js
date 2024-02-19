import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {List} from 'react-native-paper';
import {Img} from '../LocalVideo/Video';
import {DeviceWidth} from './config';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin} from '../Redux/Actions';
const SideBarComponent = props => {
  const Dispatch = useDispatch();
  const {getCompletedExercise, getDayWiseExercise, getExerciseCount} =
    useSelector(state => state);
  const CompletedCount = Object.values(getCompletedExercise).reduce(
    (acc, val) => acc + (val?.length ?? 0),
    0,
  );
  const ProgressWidth =
    (CompletedCount / getExerciseCount) * DeviceWidth * 0.6
      ? (CompletedCount / getExerciseCount) * DeviceWidth * 0.6
      : 0;
  const days = [
    {day: 'Day 1', tasks: ['Task 1']},
    {day: 'Day 2', tasks: ['Task 4']},
    {day: 'Day 3', tasks: ['Task 6']},
    {day: 'Day 4', tasks: ['Task 9']},
    {day: 'Day 5', tasks: ['Task 10']},
    {day: 'Day 6', tasks: ['Task 12',]},
    {day: 'Day 7', tasks: ['Task 15']},
  ];
  const source = getCompletedExercise;
  const updatedDays = days.map(dayObj => {
    const dayKey = `day_${dayObj.day.split(' ')[1]}`;
    const tasks = source[dayKey] || [];
    return {...dayObj, tasks};
  });
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
        </View>

        {getDayWiseExercise.lenght != 0 && (
          <>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'flex-end',
                marginVertical: 5,
                fontSize: 11,
                fontWeight: '600',
              }}>{`${CompletedCount} out of ${getExerciseCount}`}</Text>
            <View
              style={{
                width: DeviceWidth * 0.6,
                height: 8,
                backgroundColor: 'darkgrey',
                alignSelf: 'center',
                borderRadius: 20,
              }}>
              <View
                style={{
                  width: ProgressWidth,
                  position: 'absolute',
                  height: 8,
                  backgroundColor: '#D0FD3E',
                  borderRadius: 20,
                }}></View>
            </View>
          </>
        )}

        {updatedDays.map(({day, tasks}) => (
          <List.Accordion
            key={day}
            title={day}
            style={styles.day}
            titleStyle={styles.dayTitle}>
            {tasks.length == 0 && (
              <View>
                <Text
                  style={{color: 'red', alignSelf: 'center', marginTop: 10}}>
                  No data Available
                </Text>
              </View>
            )}
            {tasks.map((task, index) => (
              <List.Item
                key={`${day}-${index}`}
                title={`Workout id ${task}`}
                style={styles.task}
                titleStyle={styles.taskTitle}
              />
            ))}
          </List.Accordion>
        ))}
        <TouchableOpacity
          style={{
            backgroundColor: '#D0FD3E',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 25,
          }}
          onPress={() => {
            Dispatch(setIsLogin(false));
            props.navigation.navigate('Login');
          }}
          activeOpacity={0.5}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingVertical: 5,
              color: '#2C2C2E',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 25,
          }}>
          <Image
            source={Img.logo}
            style={{width: 80, height: 100}}
            tintColor={'#fff'}
            resizeMode="contain"
          />
          <Image
            source={Img.title}
            style={{width: 200, height: 100, marginVertical: 5}}
            tintColor={'#D0FD3E'}
            resizeMode="contain"
          />
          <Text style={{color: '#fff', fontSize: 10}}>
            {'Coded by Dileep with ✋'}
          </Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  day: {
    backgroundColor: '#2C2C2E',
    borderBottomColor: '#D0FD3E',
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: DeviceWidth * 0.6,
  },
  dayTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  task: {
    backgroundColor: 'darkgrey',
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
export default SideBarComponent;
