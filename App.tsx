import {View, Text, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRouter from './Routers/MainRouter';
const App = () => {
  const handleBackPress = () => {
    // Do nothing to stop the hardware back press
    return true;
  };
  useEffect(() => {
    // Add an event listener to handle the hardware back press
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  return (
    <NavigationContainer>
        <MainRouter />
    </NavigationContainer>
  );
};

export default App;
